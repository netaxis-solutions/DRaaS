import * as React from "react";

function SvgArrowRight(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M.922 11.58c.34.339.891.339 1.231 0l4.925-4.92a.868.868 0 00.252-.696.868.868 0 00-.255-.62L2.152.422a.87.87 0 10-1.23 1.23l4.35 4.351-4.35 4.346c-.34.34-.34.89 0 1.23z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgArrowRight);
export default ForwardRef;
