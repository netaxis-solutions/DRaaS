import * as React from "react";

function SvgCheck(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M15.626.22a1 1 0 01.154 1.406l-9.625 12a1 1 0 01-1.56 0L.22 8.17A1 1 0 111.78 6.92l3.595 4.482L14.22.374A1 1 0 0115.626.22z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCheck);
export default ForwardRef;
