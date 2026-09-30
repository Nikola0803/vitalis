export default function VitalisLogo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const wordColor = tone === "light" ? "#F5F7F3" : "#151918";
  return <svg className={className} viewBox="0 0 310 76" role="img" aria-label="Vitalis">
    <defs>
      <linearGradient id={`vitalis-mark-${tone}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#498D7E" />
        <stop offset="1" stopColor="#63A693" />
      </linearGradient>
    </defs>
    <path d="M8 12h22c10 0 15 5 20 14l15 26c4 7 8 8 12 1L94 24c6-10 14-15 27-16-10 5-17 12-23 23L75 69c-5 8-15 8-20 0L27 22c-5-8-9-10-19-10Z" fill={`url(#vitalis-mark-${tone})`} />
    <path d="M25 12h5c10 0 15 5 20 14l14 24c4 6 9 7 14 1l4-6c-8 18-20 20-29 5L25 12Z" fill="#347F70" opacity=".95" />
    <text x="125" y="52" fill={wordColor} fontFamily="Arial, Helvetica, sans-serif" fontSize="39" fontWeight="600" letterSpacing="5">VITALIS</text>
  </svg>;
}
