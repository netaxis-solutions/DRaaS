import * as React from "react";

function SvgStrokeUserProfile(
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
        d="M8 1.6a6.4 6.4 0 00-5.278 10.02A11.954 11.954 0 018 10.4c1.893 0 3.685.439 5.278 1.22A6.4 6.4 0 008 1.6zm6.123 11.55A8 8 0 101.877 2.851a8 8 0 0012.246 10.297zm-1.964-.285A10.362 10.362 0 008 12c-1.48 0-2.886.309-4.159.865A6.375 6.375 0 008 14.4c1.588 0 3.04-.578 4.159-1.535zM8 4.8A1.6 1.6 0 108 8a1.6 1.6 0 000-3.2zM4.8 6.4a3.2 3.2 0 116.4 0 3.2 3.2 0 01-6.4 0z"
        fill="#67748E"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeUserProfile);
export default ForwardRef;
