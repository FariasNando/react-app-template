import React from 'react'

const DropdownArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M7 10l5 5 5-5"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default DropdownArrowIcon
