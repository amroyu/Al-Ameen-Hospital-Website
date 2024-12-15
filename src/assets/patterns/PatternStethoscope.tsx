import React from 'react';

const PatternStethoscope: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M30 20 C30 50, 70 50, 70 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="70" cy="85" r="8" fill="currentColor" />
    <circle
      cx="30"
      cy="15"
      r="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default PatternStethoscope;
