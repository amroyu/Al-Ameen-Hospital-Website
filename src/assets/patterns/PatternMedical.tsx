import React from 'react';

const PatternMedical: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M40 20h20v20h20v20H60v20H40V60H20V40h20V20z"
      fill="currentColor"
      opacity="0.1"
    />
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
  </svg>
);

export default PatternMedical;
