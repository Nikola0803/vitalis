type IconProps = { size?: number; className?: string };

export function ArrowUpRight({ size = 18, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SearchIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

export function BagIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13l-1 11h-11l-1-11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 9V6.5a3 3 0 0 1 6 0V9" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

export function MapleMark({ size = 30, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m16 2.5 2.2 5.2 4.7-2.1-1 5.6 4.9.5-3.5 4.1 3.2 2.2-8.2 6.5.6 5H13l.6-5L5.5 18l3.2-2.2-3.5-4.1 4.9-.5-1-5.6 4.7 2.1L16 2.5Z" fill="currentColor" /></svg>;
}

export function CheckIcon({ size = 18, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function DocumentIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h7l4 4v13H7v-17Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M14 3.5v4h4M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

export function PackageIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m4.5 7.2 7.5 4 7.5-4M12 11.2V21" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

export function FlaskIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

export function ResearchGlyph({ kind, size = 120 }: { kind: "cellular" | "tissue" | "neuro" | "metabolic"; size?: number }) {
  const common = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" };
  return <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="50" opacity=".18" {...common} />
    {kind === "cellular" && <g {...common}><circle cx="47" cy="46" r="14"/><circle cx="71" cy="47" r="10"/><circle cx="63" cy="70" r="16"/><circle cx="47" cy="46" r="4"/><circle cx="63" cy="70" r="5"/></g>}
    {kind === "tissue" && <g {...common}><path d="M28 74c15-36 27-38 37-9s19 25 28-14"/><path d="M27 60c13-29 25-29 35-4s19 22 31-15"/><path d="M34 85c13-28 23-25 31-5s17 17 24-5"/></g>}
    {kind === "neuro" && <g {...common}><path d="M60 32c-14-12-29-2-25 13-12 5-11 22 1 27-2 14 15 22 24 12 9 10 26 2 24-12 12-5 13-22 1-27 4-15-11-25-25-13Z"/><path d="M60 33v52M45 46c8 1 14 7 15 15M75 46c-8 1-14 7-15 15M43 70c8-2 14-1 17 7M77 70c-8-2-14-1-17 7"/></g>}
    {kind === "metabolic" && <g {...common}><ellipse cx="60" cy="60" rx="30" ry="19" transform="rotate(-28 60 60)"/><path d="M36 72c14-8 21-26 47-26M42 80c13-11 24-15 43-20M46 42c10 7 17 14 25 29"/><path d="m83 36 4 11-11 2"/></g>}
  </svg>;
}
