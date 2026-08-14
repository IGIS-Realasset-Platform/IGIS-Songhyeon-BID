import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSonghyeonAuth } from '../context/SonghyeonAuthContext';
import { songhyeonSupabase } from '../lib/songhyeonSupabase';

function BackButton({ onBack }) {
  return <button type="button" onClick={onBack} className="text-[#86868B] hover:text-white transition-colors flex items-center text-[13px] shrink-0 cursor-pointer">← 뒤로</button>;
}

function StatusMessage({ errorMessage, noticeMessage }) {
  return <div className="w-full min-h-[20px] my-1 flex items-center px-1">{errorMessage && <span className="text-red-500 dark:text-[#FF453A] text-[13px] font-medium">* {errorMessage}</span>}{noticeMessage && <span className="text-green-500 text-[13px] font-medium">{noticeMessage}</span>}</div>;
}

export default function Login() {
  const { user, member, enterGuestMode, signIn, updatePassword, resetPassword, recoveryMode, setRecoveryMode, configurationError } = useSonghyeonAuth();
  const [step, setStep] = useState(recoveryMode ? 5 : 1);
  const [email, setEmail] = useState('');
  const [staffName, setStaffName] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const postLoginPath = location.state?.from && location.state.from !== '/' ? location.state.from : '/tasks';

  useEffect(() => { const timer = setTimeout(() => setMounted(true), 100); return () => clearTimeout(timer); }, []);
  useEffect(() => { if (step === 2) passwordInputRef.current?.focus(); }, [step]);

  useEffect(() => { if (user && member) navigate(postLoginPath, { replace: true }); }, [user, member, navigate, postLoginPath]);
  if (user && member) return <Navigate to={postLoginPath} replace />;

  const clearMessages = () => { setErrorMessage(''); setNoticeMessage(''); };
  const fail = (message) => { setErrorMessage(message); setBusy(false); };
  const recordLogin = async (sessionUser) => {
    if (!sessionUser) return;
    await songhyeonSupabase.from('songhyeon_login_history').insert({ auth_id: sessionUser.id, email: sessionUser.email });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault(); clearMessages();
    if (!email.includes('@')) return fail('유효한 이메일 주소를 입력해주세요.');
    if (configurationError || !songhyeonSupabase) return fail('서버 연결에 실패했습니다.');
    setIsCheckingEmail(true);
    const { data, error } = await songhyeonSupabase.rpc('check_songhyeon_member_email', { candidate_email: email.trim().toLowerCase() });
    setIsCheckingEmail(false);
    if (error) return fail(`서버 오류: ${error.message}`);
    const matchedMember = Array.isArray(data) ? data[0] : data;
    if (!matchedMember) return fail('등록되지 않은 사용자입니다. 관리팀에 문의해주세요.');
    setStaffName(matchedMember.staff_name);
    setStep(2);
  };

  const proceedLogin = async () => {
    clearMessages(); setBusy(true);
    const { data, error } = await signIn(email, password);
    if (error) return fail('로그인 실패: 패스워드를 확인해주세요.');
    await recordLogin(data.user);
    setBusy(false);
    window.location.assign(postLoginPath);
  };

  const browseAsGuest = async () => {
    clearMessages();
    setBusy(true);
    try {
      await enterGuestMode();
      navigate(location.state?.from || '/', { replace: true });
    } catch (error) {
      fail(error.message || '게스트 모드로 전환하지 못했습니다.');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault(); clearMessages();
    if (password.length < 6) return fail('패스워드는 최소 6자리 이상이어야 합니다.');
    await proceedLogin();
  };

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault(); clearMessages();
    if (newPassword.length < 6) return fail('새 패스워드는 최소 6자리 이상이어야 합니다.');
    if (newPassword !== confirmNewPassword) return fail('새 패스워드가 일치하지 않습니다.');
    if (oldPassword === newPassword) return fail('새 패스워드는 기존 패스워드와 달라야 합니다.');
    setBusy(true);
    const { data, error } = await signIn(email, oldPassword);
    if (error || !data.user) return fail('기존 패스워드가 올바르지 않습니다.');
    const { error: updateError } = await updatePassword(newPassword);
    if (updateError) return fail('패스워드 변경 실패: ' + updateError.message);
    await recordLogin(data.user);
    setBusy(false); setNoticeMessage('패스워드가 성공적으로 변경되었습니다.');
    setTimeout(() => window.location.assign('/tasks'), 700);
  };

  const handleResetEmailSubmit = async (event) => {
    event.preventDefault(); clearMessages(); setBusy(true);
    const { error } = await resetPassword(email);
    setBusy(false);
    if (error) return fail('이메일 발송 실패: ' + error.message);
    setNoticeMessage('이메일로 비밀번호 재설정 링크가 발송되었습니다. 이메일을 확인해주세요.');
  };

  const handleRecoveryPasswordSubmit = async (event) => {
    event.preventDefault(); clearMessages();
    if (newPassword.length < 6) return fail('새 패스워드는 최소 6자리 이상이어야 합니다.');
    if (newPassword !== confirmNewPassword) return fail('새 패스워드가 일치하지 않습니다.');
    setBusy(true);
    const { error } = await updatePassword(newPassword);
    setBusy(false);
    if (error) return fail('패스워드 변경 실패: ' + error.message);
    setRecoveryMode(false); setNoticeMessage('패스워드가 성공적으로 변경되었습니다.');
    setTimeout(() => window.location.assign('/tasks'), 700);
  };

  const inputClass = 'w-full bg-white dark:bg-[#262626] text-[#111] dark:text-white placeholder-gray-400 dark:placeholder-[#737373] text-[15px] px-4 py-3.5 rounded-[16px] border border-black/10 dark:border-[#3A3A3A] focus:outline-none focus:border-[#111] dark:focus:border-[#666] transition-colors duration-300';
  const primaryClass = 'w-full bg-[#111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#333] dark:hover:bg-gray-200 rounded-[16px] py-3.5 font-semibold transition-colors text-[16px] cursor-pointer disabled:opacity-60';
  const activeStep = recoveryMode ? 5 : step;
  const goBack = (to = 2) => { setStep(to); clearMessages(); };
  const message = <StatusMessage errorMessage={errorMessage} noticeMessage={noticeMessage} />;

  return <div className="w-full min-h-screen bg-[#FDFDFD] dark:bg-[#111111] text-[#1D1D1F] dark:text-white flex flex-col font-sans">
    <div className={`w-full flex justify-between items-center px-6 md:px-12 pb-6 md:pb-8 relative z-50 transition-all duration-[1200ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top))' }}>
      <div className="text-[20px] font-bold tracking-wide">IFPDP</div>
      <a href="https://iotaseoul.cloud/home#page-1" target="_blank" rel="noopener noreferrer" className="text-[17px] font-medium text-[#86868B] dark:text-[#A1A1AA] hover:text-white cursor-pointer no-underline">IFPDP 소개</a>
    </div>
    <div className={`flex-1 flex flex-col items-center justify-center -mt-16 md:-mt-32 px-4 transition-all duration-[1200ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h1 className="text-[20px] md:text-[42px] font-bold mb-[20px] md:mb-[26px] tracking-tight text-center">Songhyeon BID</h1>
      <div className="w-full max-w-[460px] bg-white dark:bg-transparent border border-black/10 dark:border-[#333333] rounded-[24px] md:rounded-[28px] p-6 md:p-8 flex flex-col shadow-xl dark:shadow-2xl">
        {activeStep === 1 && <><div className="w-full mt-1 mb-6"><span className="text-[17px] font-semibold">이지스 이메일을 입력해주세요.</span></div><form onSubmit={handleEmailSubmit}><div className="mb-2"><input type="email" placeholder="이메일을 입력하세요." value={email} disabled={isCheckingEmail || busy} onChange={(e) => { setEmail(e.target.value); clearMessages(); }} className={inputClass} /></div>{message}<button type="submit" disabled={isCheckingEmail || busy} className={primaryClass}>{isCheckingEmail ? '확인 중...' : '다음'}</button></form><div className="my-4 flex items-center gap-3" aria-hidden="true"><span className="h-px flex-1 bg-black/10 dark:bg-[#333]" /><span className="text-[11px] font-semibold text-[#86868B]">또는</span><span className="h-px flex-1 bg-black/10 dark:bg-[#333]" /></div><button type="button" disabled={busy} onClick={browseAsGuest} className="w-full cursor-pointer rounded-[16px] border border-black/10 py-3.5 text-[15px] font-semibold text-[#52525B] transition-colors hover:bg-black/[0.03] disabled:cursor-wait disabled:opacity-60 dark:border-[#3A3A3A] dark:text-[#C7C7CC] dark:hover:bg-white/5">{busy ? '둘러보기 준비 중…' : <>로그인 없이 둘러보기 <span className="ml-1 text-[12px] font-normal text-[#86868B]">· 읽기 전용</span></>}</button><p className="mt-2 px-2 text-center text-[10px] leading-4 text-[#86868B]">게스트 이용 시 익명 브라우저 식별자로 페이지 방문 기록만 집계됩니다.</p></>}
        {activeStep === 2 && <><div className="flex items-center justify-between w-full mt-1 mb-6"><div className="flex items-center"><div className="w-[36px] h-[36px] rounded-full overflow-hidden mr-3"><img src={`/songhyeon-members/${staffName}.webp`} alt={staffName} className="w-full h-full object-cover" /></div><span className="text-[16px] font-semibold">{staffName}님 반갑습니다. 패스워드를 입력해주세요.</span></div><BackButton onBack={() => goBack(1)} /></div><form onSubmit={handlePasswordSubmit}><div className="mb-2"><input type="password" ref={passwordInputRef} placeholder="패스워드를 입력하세요." value={password} onChange={(e) => { setPassword(e.target.value); clearMessages(); }} className={inputClass} /></div>{message}<button type="submit" disabled={busy} className={primaryClass}>확인하기</button><div className="w-full mt-5 flex justify-center items-center"><button type="button" onClick={() => setStep(3)} className="text-[#86868B] text-[13px] cursor-pointer">패스워드 변경</button><span className="mx-3 text-[#333]">|</span><button type="button" onClick={() => setStep(4)} className="text-[#86868B] text-[13px] cursor-pointer">비밀번호를 잊으셨나요?</button></div></form></>}
        {activeStep === 3 && <><div className="flex justify-between mt-1 mb-6"><span className="text-[17px] font-semibold">패스워드를 변경해주세요.</span><BackButton onBack={() => goBack()} /></div><form onSubmit={handleChangePasswordSubmit}><div className="mb-2"><input type="password" placeholder="기존 패스워드" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={inputClass} /></div><div className="mb-2"><input type="password" placeholder="새 패스워드" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} /></div><div className="mb-2"><input type="password" placeholder="새 패스워드 확인" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className={inputClass} /></div>{message}<button type="submit" disabled={busy} className={primaryClass}>변경 및 접속하기</button></form></>}
        {activeStep === 4 && <><div className="flex justify-between mt-1 mb-6"><span className="text-[17px] font-semibold">비밀번호 재설정 링크 발송</span><BackButton onBack={() => goBack()} /></div><p className="text-[#86868B] text-[14px] mb-6 leading-relaxed">가입하신 이메일 주소로 비밀번호를 재설정할 수 있는 링크를 보내드립니다.</p><form onSubmit={handleResetEmailSubmit}><div className="mb-2"><input type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} /></div>{message}<button type="submit" disabled={busy} className={primaryClass}>재설정 링크 받기</button></form></>}
        {activeStep === 5 && <><div className="w-full mt-1 mb-6"><span className="text-[17px] font-semibold">새로운 패스워드 설정</span></div><form onSubmit={handleRecoveryPasswordSubmit}><div className="mb-2"><input type="password" placeholder="새 패스워드" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} /></div><div className="mb-2"><input type="password" placeholder="새 패스워드 확인" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className={inputClass} /></div>{message}<button type="submit" disabled={busy} className={primaryClass}>패스워드 저장 및 접속하기</button></form></>}
      </div>
    </div>
  </div>;
}
