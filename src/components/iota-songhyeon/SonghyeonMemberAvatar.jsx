/* eslint-disable react-refresh/only-export-components */
const withBaseUrl = (path) => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl.replace(/\/?$/, '/')}${String(path || '').replace(/^\/+/, '')}`;
};

export const songhyeonMemberPhotoSource = ({ name = '', photoPath = '' } = {}) => {
  const storedPath = String(photoPath || '').trim();
  if (storedPath) {
    if (/^(?:https?:|data:|blob:)/i.test(storedPath)) return storedPath;
    return withBaseUrl(storedPath);
  }

  const memberName = String(name || '').trim();
  return memberName ? withBaseUrl(`songhyeon-members/${encodeURIComponent(memberName)}.webp`) : '';
};

export default function SonghyeonMemberAvatar({
  name = '',
  photoPath = '',
  className = 'h-10 w-10',
  imageClassName = '',
}) {
  const source = songhyeonMemberPhotoSource({ name, photoPath });
  const initials = String(name || '송현').trim().slice(-2) || '송현';

  return (
    <span className={`${className} relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-[#353535] text-[11px] font-bold text-white`}>
      <span aria-hidden="true">{initials}</span>
      {source ? (
        <img
          key={source}
          src={source}
          alt=""
          className={`absolute inset-0 h-full w-full rounded-full object-cover ${imageClassName}`}
          onLoad={(event) => { event.currentTarget.style.display = ''; }}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      ) : null}
    </span>
  );
}
