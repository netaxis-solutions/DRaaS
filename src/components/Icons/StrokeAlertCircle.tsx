import * as React from "react";

function SvgStrokeAlertCircle(
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
        d="M2.343 2.343a8 8 0 0111.315 11.312m-1.133-10.18a6.401 6.401 0 00-8.45-.531l8.981 8.98a6.401 6.401 0 00-.53-8.45zm1.13 10.184A8 8 0 012.343 2.343M13.655 13.66l.002-.002v-.001m-1.732-.6l-8.981-8.98a6.401 6.401 0 008.98 8.98z"
        fill="#EC4436"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeAlertCircle);
export default ForwardRef;
