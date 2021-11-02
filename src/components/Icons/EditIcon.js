import * as React from "react";

function SvgEditicon(props, svgRef) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M0.5 12.3749V15.4999H3.625L12.8417 6.28323L9.71667 3.15823L0.5 12.3749ZM15.2583 3.86657C15.5833 3.54157 15.5833 3.01657 15.2583 2.69157L13.3083 0.741568C12.9833 0.416568 12.4583 0.416568 12.1333 0.741568L10.6083 2.26657L13.7333 5.39157L15.2583 3.86657Z"
        fill="#828282"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEditicon);
export default ForwardRef;
