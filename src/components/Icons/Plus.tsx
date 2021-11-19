import * as React from "react";

function SvgPlus(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M7 .7A6.302 6.302 0 00.7 7c0 3.478 2.822 6.3 6.3 6.3 3.478 0 6.3-2.822 6.3-6.3C13.3 3.523 10.478.7 7 .7zm2.52 6.93H7.63v1.89c0 .347-.284.63-.63.63a.632.632 0 01-.63-.63V7.63H4.48A.632.632 0 013.85 7c0-.346.283-.63.63-.63h1.89V4.48c0-.346.283-.63.63-.63.346 0 .63.284.63.63v1.89h1.89c.346 0 .63.284.63.63 0 .347-.284.63-.63.63z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPlus);
export default ForwardRef;
