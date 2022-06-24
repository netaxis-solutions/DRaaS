import * as React from "react";

function SvgStrokeOpenEye(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.559 8c.937 2.622 3.468 4.5 6.441 4.5s5.504-1.878 6.441-4.5C13.503 5.378 10.973 3.5 8 3.5S2.496 5.378 1.559 8zM.035 7.775C1.098 4.43 4.26 2 8 2s6.902 2.429 7.965 5.775a.742.742 0 010 .45C14.902 11.57 11.74 14 8 14S1.098 11.571.035 8.225a.742.742 0 010-.45zM8 6.5c-.839 0-1.518.672-1.518 1.5S7.162 9.5 8 9.5 9.517 8.828 9.517 8 8.837 6.5 8 6.5zM4.964 8c0-1.657 1.36-3 3.036-3s3.035 1.343 3.035 3S9.676 11 8 11c-1.677 0-3.036-1.343-3.036-3z"
        fill="#3664F7"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeOpenEye);
export default ForwardRef;
