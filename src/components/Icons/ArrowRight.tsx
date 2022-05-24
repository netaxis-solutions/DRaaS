import * as React from "react";

function SvgArrowRight(
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
      <path d="M3.51485 8.43656L3.55862 8.39719L6.82074 5.42219C6.93121 5.32156 7 5.17063 7 5.00219C7 4.83375 6.92913 4.68281 6.82074 4.58219L3.56488 1.60938L3.51068 1.55906C3.45857 1.52188 3.39604 1.5 3.32934 1.5C3.14799 1.5 3 1.66188 3 1.86313L3 8.13688C3 8.33813 3.14799 8.5 3.32934 8.5C3.39812 8.5 3.46274 8.47594 3.51485 8.43656Z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgArrowRight);
export default ForwardRef;
