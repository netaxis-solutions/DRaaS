import * as React from "react";

function SvgStrokeAlert(
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
        d="M8 1.455a6.545 6.545 0 100 13.09 6.545 6.545 0 000-13.09zM0 8a8 8 0 1116 0A8 8 0 010 8zm8-3.636c.402 0 .727.325.727.727V8a.727.727 0 01-1.454 0V5.09c0-.4.325-.726.727-.726zm-.727 6.545c0-.402.325-.727.727-.727h.007a.727.727 0 110 1.454H8a.727.727 0 01-.727-.727z"
        fill="#DF2231"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeAlert);
export default ForwardRef;
