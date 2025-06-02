import React from 'react'

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g id="east">
      <mask
        id="mask0_95_2151"
        style={{ maskType: 'alpha' } as any}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect id="Bounding box" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_95_2151)">
        <path
          id="east_2"
          d="M12.3638 15.2196L11.5978 14.4536L15.5178 10.5336H2.41675V9.45045H15.5257L11.5978 5.53045L12.3638 4.7644L17.5913 9.99211L12.3638 15.2196Z"
          fill="#1C1B1F"
        />
      </g>
    </g>
  </svg>
)

export default ArrowRightIcon
