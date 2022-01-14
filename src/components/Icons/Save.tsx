import * as React from "react";

function SvgSave(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M9.333 0h-8C.593 0 0 .6 0 1.333v9.334C0 11.4.593 12 1.333 12h9.334C11.4 12 12 11.4 12 10.667v-8L9.333 0zM6 10.667c-1.107 0-2-.894-2-2 0-1.107.893-2 2-2s2 .893 2 2c0 1.106-.893 2-2 2zM8 4H1.333V1.333H8V4z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSave);
export default ForwardRef;
