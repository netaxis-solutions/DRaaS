import * as React from "react";

function SvgInfoIcon(
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
      <path d="M10 1a9 9 0 100 18 9 9 0 000-18zM8.875 8.875a1.125 1.125 0 012.25 0V14.5a1.125 1.125 0 11-2.25 0V8.875zM10 6.643a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgInfoIcon);
export default ForwardRef;
