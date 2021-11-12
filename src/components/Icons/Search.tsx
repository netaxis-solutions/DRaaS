import * as React from "react";

function SvgSearch(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M1.887 10.992a6.429 6.429 0 008.5.528l4.256 4.255a.8.8 0 001.132-1.131l-4.257-4.256A6.432 6.432 0 006.238.003 6.437 6.437 0 001.887 1.89a6.435 6.435 0 000 9.103zm1.131-7.97a4.838 4.838 0 017.89 5.27 4.837 4.837 0 01-9.306-1.85 4.8 4.8 0 011.416-3.421v.001z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSearch);
export default ForwardRef;
