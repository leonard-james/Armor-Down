/* LogoIcon
   Theme-aware: uses CSS variables so the circle fill and stroke
   adapt to dark / light mode without any React re-render.
   The Navbar overrides these via style props when running
   the shield-redraw animation. */
export default function LogoIcon({ className, style, circleFill, strokeColor }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      style={{ height: '40px', width: '40px', ...style }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Armor Down logo"
    >
      <title>Armor Down</title>
      <circle
        cx="130"
        cy="130"
        r="90"
        fill={circleFill ?? 'var(--logo-circle)'}
        style={{ transition: 'fill 0.3s ease' }}
      />
      <path
        d="M 130 72 L 96 86 L 96 132 C 96 162 112 180 130 190 C 148 180 164 162 164 132 L 164 86 L 148 79.5"
        fill="none"
        stroke={strokeColor ?? 'var(--logo-stroke)'}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s ease' }}
      />
    </svg>
  );
}
