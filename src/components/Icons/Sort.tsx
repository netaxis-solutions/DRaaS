import * as React from "react";

function SvgSort(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M9.333 12.175V7.167a.836.836 0 00-.833-.834.836.836 0 00-.833.834v5.008H6.175a.412.412 0 00-.292.708L8.208 15.2a.428.428 0 00.592 0l2.325-2.317c.267-.258.075-.708-.292-.708h-1.5zM3.208.792L.883 3.117a.412.412 0 00.292.708h1.492v5.008c0 .459.375.834.833.834a.836.836 0 00.833-.834V3.825h1.492c.375 0 .558-.45.292-.708L3.792.792a.418.418 0 00-.584 0z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSort);
export default ForwardRef;
