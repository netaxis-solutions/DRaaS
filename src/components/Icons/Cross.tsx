import * as React from "react";

function SvgCross(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M9.809.191a.652.652 0 00-.923 0L5 4.078 1.114.19a.652.652 0 10-.923.923L4.077 5 .191 8.886a.652.652 0 10.923.923L5 5.923l3.886 3.886a.652.652 0 10.923-.923L5.922 5 9.81 1.114a.652.652 0 000-.923z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCross);
export default ForwardRef;
