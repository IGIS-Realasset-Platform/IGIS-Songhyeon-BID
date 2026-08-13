/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { songhyeonSupabase, songhyeonSupabaseError } from '../lib/songhyeonSupabase';

const SonghyeonAuthContext = createContext(null);

export function SonghyeonAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(Boolean(songhyeonSupabase));
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
      if (active) setLoading(false);
    });
    const { data: listener } = songhyeonSupabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true);
      const currentUser = session?.user || null;
      setUser(currentUser);
      queueMicrotask(() => loadMember(currentUser));
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const value = useMemo(() => ({
    user, member, loading, recoveryMode, setRecoveryMode, configurationError: songhyeonSupabaseError,
    signIn: (email, password) => songhyeonSupabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password }),

    updatePassword: (password) => songhyeonSupabase.auth.updateUser({ password }),
    resetPassword: (email) => songhyeonSupabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${window.location.origin}/login` }),
    signOut: async () => { if (songhyeonSupabase) await songhyeonSupabase.auth.signOut({ scope: 'local' }); setUser(null); setMember(null); },
  }), [user, member, loading, recoveryMode]);
  return <SonghyeonAuthContext.Provider value={value}>{children}</SonghyeonAuthContext.Provider>;
}

export function useSonghyeonAuth() {
  const value = useContext(SonghyeonAuthContext);
  if (!value) throw new Error('SonghyeonAuthProvider가 필요합니다.');
  return value;
}
