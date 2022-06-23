import * as React from "react";

function SvgThreeVerticalDots(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8.667 5.333a1.333 1.333 0 112.667 0 1.333 1.333 0 01-2.667 0zm0 4.667a1.333 1.333 0 112.667 0 1.333 1.333 0 01-2.667 0zm0 4.667a1.333 1.333 0 112.667 0 1.333 1.333 0 01-2.667 0z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgThreeVerticalDots);
export default ForwardRef;
