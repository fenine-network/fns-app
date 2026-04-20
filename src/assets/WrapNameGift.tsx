export const WrapNameGift = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <svg
      viewBox="0 0 200 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient
          id="fnsGiftBg"
          x1="22"
          y1="12"
          x2="176"
          y2="138"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF8F4" />
          <stop offset="1" stopColor="#FFE7E1" />
        </linearGradient>
        <linearGradient
          id="fnsGiftAccent"
          x1="26"
          y1="18"
          x2="170"
          y2="129"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4747" />
          <stop offset="0.55" stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#FF9C7A" />
        </linearGradient>
        <filter id="shadow" x="8" y="4" width="184" height="139" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#2C1612" floodOpacity="0.12" />
        </filter>
        <clipPath id="mediaClip">
          <rect x="20" y="12" width="160" height="123" rx="0" />
        </clipPath>
        <mask id="mediaFade">
          <rect x="20" y="12" width="160" height="123" fill="white" />
          <rect x="20" y="12" width="160" height="123" fill="url(#fnsGiftBg)" />
        </mask>
      </defs>

      <g filter="url(#shadow)">
        <rect x="20" y="12" width="160" height="123" fill="url(#fnsGiftBg)" />
        <rect x="20.5" y="12.5" width="159" height="122" stroke="rgba(40,25,21,0.12)" />
      </g>

      <g clipPath="url(#mediaClip)" opacity="0.12" mask="url(#mediaFade)">
        <image
          x="18"
          y="10"
          width="164"
          height="127"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref={imageSrc}
        />
      </g>

      <rect x="20" y="12" width="160" height="36" fill="url(#fnsGiftAccent)" />
      <rect x="20" y="114" width="160" height="21" fill="rgba(24,20,18,0.04)" />

      <image x="28" y="20" width="18" height="19" xlinkHref="/favicon.svg" />

      <circle cx="100" cy="74" r="34" fill="url(#fnsGiftAccent)" opacity="0.16" />
      <image x="79" y="51" width="42" height="44" xlinkHref="/favicon.svg" />

      <text
        x="100"
        y="123"
        textAnchor="middle"
        fill="#201B18"
        fontFamily="Space Grotesk, Noto Color Emoji, Apple Color Emoji, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        FNS identity card
      </text>
    </svg>
  )
}
