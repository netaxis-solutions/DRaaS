import * as React from "react";

function SvgEyeOpened(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M10 .75C5.833.75 2.275 3.342.833 7c1.442 3.658 5 6.25 9.167 6.25 4.166 0 7.725-2.592 9.166-6.25-1.441-3.658-5-6.25-9.166-6.25zm0 10.417A4.168 4.168 0 015.833 7C5.833 4.7 7.7 2.833 10 2.833S14.166 4.7 14.166 7 12.3 11.167 10 11.167zM10 4.5A2.497 2.497 0 007.5 7c0 1.383 1.116 2.5 2.5 2.5 1.383 0 2.5-1.117 2.5-2.5S11.383 4.5 10 4.5z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEyeOpened);
export default ForwardRef;
