import * as React from "react";

function SvgPercent(
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
      <path d="M16.125 3.875l-12.25 12.25M5.188 7.375a2.188 2.188 0 100-4.375 2.188 2.188 0 000 4.375zM14.813 17a2.188 2.188 0 100-4.375 2.188 2.188 0 000 4.375z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPercent);
export default ForwardRef;
