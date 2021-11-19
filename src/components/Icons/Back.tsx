import * as React from "react";

function SvgBack(
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
      <path d="M9.084 4.417H2.165l2.118-2.544a.584.584 0 10-.899-.746l-2.916 3.5a.694.694 0 00-.053.087c0 .03 0 .047-.04.076A.583.583 0 00.332 5c.001.072.015.143.041.21 0 .03 0 .047.041.076.015.03.033.06.053.087l2.916 3.5a.583.583 0 00.899-.746L2.165 5.583h6.919a.583.583 0 100-1.166z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgBack);
export default ForwardRef;
