export function WorkspacePageFrame({ children, className = '', contentClassName = '', fluidContent = false }) {
  return (
    <div className={`min-h-full w-full min-w-0 flex-1 pb-[100px] pt-[28px] text-[#E5E5E5] ${className}`}>
      <div className={`${fluidContent ? 'w-full' : 'mx-auto w-[1200px] max-w-full'} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

export function WorkspacePageHeader({
  title,
  description,
  controls,
  actions,
  className = '',
  ...headerProps
}) {
  return (
    <header
      {...headerProps}
      className={`mx-auto mb-[12px] flex h-[37px] w-[1200px] max-w-full items-end justify-between gap-8 ${className}`}
    >
      <div className="flex min-w-0 items-center gap-[16px]">
        <h1 className="shrink-0 font-['Inter'] text-[32px] font-bold leading-none tracking-tight text-white">{title}</h1>
        {description && <p className="truncate text-[14px] leading-none text-[#86868B]">{description}</p>}
        {controls && <div className="flex shrink-0 items-center">{controls}</div>}
      </div>
      {actions && <div className="flex shrink-0 items-end">{actions}</div>}
    </header>
  );
}
