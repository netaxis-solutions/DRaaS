import * as React from "react";

function SvgTrash(props, svgRef) {
  return (
    <svg
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M1 13.833c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667v-10H1v10zm10.833-12.5H8.917L8.083.5H3.917l-.834.833H.167V3h11.666V1.333z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTrash);
export default ForwardRef;
