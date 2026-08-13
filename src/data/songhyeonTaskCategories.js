export const songhyeonTaskCategories = [
  '사례조사·현장질문',
  '자료전수조사',
  '이용자경험·문제도출',
  '현장 운영 관련',
  '기회영역',
  '서비스 가설설계',
  'BID 공공가치',
  '운영모델·파트너 검토',
  '공공정합성',
  '최소실행조건 판단',
  '현장 실행안',
  '지원·운영조건',
  'MVP 패키지',
  '실행 최종판단',
  '실증·평가',
];

const categoryByWorkstream = {
  'G0-WS01': '사례조사·현장질문',
  'G0-WS02': '자료전수조사',
  'G1-WS01': '이용자경험·문제도출',
  'G1-WS02': '현장 운영 관련',
  'G1-WS03': '기회영역',
  'G2-WS01': '서비스 가설설계',
  'G2-WS02': 'BID 공공가치',
  'G2-WS03': '서비스 가설설계',
  'G3-WS01': '운영모델·파트너 검토',
  'G3-WS02': '운영모델·파트너 검토',
  'G3-WS04': '최소실행조건 판단',
  'G4-WS01': '현장 실행안',
  'G4-WS02': '지원·운영조건',
  'G4-WS03': 'MVP 패키지',
  'G5-WS01': '실행 최종판단',
  'G5-WS02': '운영모델·파트너 검토',
  'G5-WS03': '현장 운영 관련',
  'G5-WS04': '공공정합성',
  'G6-WS01': '실증·평가',
};

const categoryByTask = {
  'G0-WS03-T01': '자료전수조사',
  'G0-WS03-T02': '자료전수조사',
  'G0-WS03-T03': '기회영역',
  'G3-WS03-T01': '공공정합성',
  'G3-WS03-T02': '지원·운영조건',
  'G3-WS03-T03': '공공정합성',
  'G3-WS03-T04': '공공정합성',
};

export const categoryForSonghyeonTask = (sourceKey, fallback = '') => {
  if (categoryByTask[sourceKey]) return categoryByTask[sourceKey];
  const workstreamKey = String(sourceKey || '').match(/^G\d-WS\d{2}/)?.[0];
  return categoryByWorkstream[workstreamKey] || fallback;
};
