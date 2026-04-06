const LogoIcon = props => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Robot head icon */}
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <circle cx="9" cy="11" r="1.5" fill="currentColor" />
      <circle cx="15" cy="11" r="1.5" fill="currentColor" />
      <path d="M9 16h6" />
      <line x1="12" y1="1" x2="12" y2="4" />
    </svg>
  )
}

export default LogoIcon
