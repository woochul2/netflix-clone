import React from 'react';

export default function Plus(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke="#000" strokeWidth={2} d="M12 22V2M2 12h20" />
    </svg>
  );
}
