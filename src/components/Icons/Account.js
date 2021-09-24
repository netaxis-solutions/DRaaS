import * as React from "react";

function SvgAccount(props, svgRef) {
  return (
    <svg
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      style={{ width: 16, height: 18, ...props.style }}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M1.72 11.887a4.167 4.167 0 012.947-1.22h6.666a4.167 4.167 0 014.167 4.166V16.5a.833.833 0 11-1.667 0v-1.667a2.5 2.5 0 00-2.5-2.5H4.667a2.5 2.5 0 00-2.5 2.5V16.5a.833.833 0 11-1.667 0v-1.667c0-1.105.439-2.165 1.22-2.946zM8 2.333a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm-4.167 2.5a4.167 4.167 0 118.334 0 4.167 4.167 0 01-8.334 0z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgAccount);
export default ForwardRef;
