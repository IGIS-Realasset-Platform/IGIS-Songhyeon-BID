/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { songhyeonSupabase, songhyeonSupabaseError } from '../lib/songhyeonSupabase';

const SonghyeonAuthContext = createContext(null);
const GUEST_MODE_KEY = 'songhyeon-guest-mode';
const DEVICE_ID_KEY = 'songhyeon-device-id';

const readLocalValue = (key) => {
  if (typeof window === 'undefined') return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
};
const writeLocalValue = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch { /* Device storage may be unavailable in private browsing. */ }
};
const getOrCreateDeviceId = () => {
  const stored = readLocalValue(DEVICE_ID_KEY);
  if (stored) return stored;
  const next = typeof globalThis.crypto?.randomUUID === 'function' ? globalThis.crypto.randomUUID() : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  writeLocalValue(DEVICE_ID_KEY, next);
  return next;
};

export function SonghyeonAuthProvider({ children }) {
  const [guestMode, setGuestMode] = useState(() => readLocalValue(GUEST_MODE_KEY) === '1');
  const [deviceId] = useState(getOrCreateDeviceId);
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(Boolean(songhyeonSupabase) && !guestMode);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    if (!songhyeonSupabase) return;
    let active = true;
    const loadMember = async (sessionUser) => {
      if (!sessionUser) { if (active) setMember(null); return; }
      const { data, error } = await songhyeonSupabase.from('songhyeon_members').select('*').eq('auth_id', sessionUser.id).eq('is_active', true).maybeSingle();
      if (!active) return;
      if (error || !data) {
        setMember(null);
      } else setMember(data);
    };
    songhyeonSupabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      const currentUser = data.session?.user || null;
      setUser(currentUser);
      await loadMember(currentUser);
      if (currentUser) {
        writeLocalValue(GUEST_MODE_KEY, null);
        setGuestMode(false);
      }
      if (active) setLoading(false);
    });
    const { data: listener } = songhyeonSupabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true);
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        writeLocalValue(GUEST_MODE_KEY, null);
        setGuestMode(false);
      }
      queueMicrotask(() => loadMember(currentUser));
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const exitGuestMode = useCallback(() => {
    writeLocalValue(GUEST_MODE_KEY, null);
    setGuestMode(false);
  }, []);
  const enterGuestMode = useCallback(async () => {
    if (songhyeonSupabase) {
      const { data, error: sessionError } = await songhyeonSupabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (data.session) {
        const { error } = await songhyeonSupabase.auth.signOut({ scope: 'local' });
        if (error) throw error;
      }
    }
    writeLocalValue(GUEST_MODE_KEY, '1');
    setUser(null);
    setMember(null);
    setGuestMode(true);
    setLoading(false);
  }, []);
  const signIn = useCallback((email, password) => {
    exitGuestMode();
    return songhyeonSupabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  }, [exitGuestMode]);
  const signOut = useCallback(async () => {
    exitGuestMode();
    if (songhyeonSupabase) await songhyeonSupabase.auth.signOut({ scope: 'local' });
    setUser(null);
    setMember(null);
  }, [exitGuestMode]);

  const isGuest = guestMode && !user;
  const isAdmin = Boolean(
    user
    && member?.staff_name === '전기영'
    && user.email?.toLowerCase() === 'jk.jeon@igisam.com',
  );

  const value = useMemo(() => ({
    user, member, loading, recoveryMode, setRecoveryMode, configurationError: songhyeonSupabaseError,
    isGuest, isReadOnly: isGuest, isAdmin, deviceId, enterGuestMode, exitGuestMode, signIn,

    updatePassword: (password) => songhyeonSupabase.auth.updateUser({ password }),
    resetPassword: (email) => songhyeonSupabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${window.location.origin}/login` }),
    signOut,
  }), [deviceId, enterGuestMode, exitGuestMode, isAdmin, isGuest, loading, member, recoveryMode, signIn, signOut, user]);
  return <SonghyeonAuthContext.Provider value={value}>{children}</SonghyeonAuthContext.Provider>;
}

export function useSonghyeonAuth() {
  const value = useContext(SonghyeonAuthContext);
  if (!value) throw new Error('SonghyeonAuthProvider가 필요합니다.');
  return value;
}
