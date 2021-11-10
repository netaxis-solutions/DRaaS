import * as React from "react";

function SvgArrowLeft(props, svgRef) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M7.078.42a.871.871 0 00-1.231 0L.922 5.34a.868.868 0 00-.252.696.868.868 0 00.255.62l4.923 4.922a.87.87 0 101.23-1.23l-4.35-4.351 4.35-4.346a.87.87 0 000-1.23z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgArrowLeft);
export default ForwardRef;
