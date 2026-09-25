export default function LogoIcon({ className, style }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      style={{ height: '40px', width: '40px', color: 'white', ...style }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Armor Down logo"
    >
      <title>Armor Down</title>
      <circle cx="130" cy="130" r="90" fill="#0f172a" />
      <path
        d="M 130 72
           L 96 86
           L 96 132
           C 96 162 112 180 130 190
           C 148 180 164 162 164 132
           L 164 86
           L 148 79.5"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
