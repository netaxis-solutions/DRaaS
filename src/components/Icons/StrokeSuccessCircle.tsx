import * as React from "react";

function SvgStrokeSuccessCircle(
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
        d="M10.664 2.021a6.545 6.545 0 103.882 5.983v-.669a.727.727 0 111.454 0v.67a8.001 8.001 0 01-14.711 4.35A8 8 0 0111.256.692a.727.727 0 11-.592 1.328zm5.123-.35a.727.727 0 010 1.029L8.515 9.98a.727.727 0 01-1.03 0L5.305 7.798A.727.727 0 116.332 6.77L8 8.437l6.758-6.765a.727.727 0 011.029 0z"
        fill="#8BB439"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeSuccessCircle);
export default ForwardRef;
