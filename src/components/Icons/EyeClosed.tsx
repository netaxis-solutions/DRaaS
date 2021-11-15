import * as React from "react";

function SvgEyeClosed(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M10 3.833c2.3 0 4.166 1.867 4.166 4.167 0 .542-.108 1.05-.3 1.525l2.434 2.433A9.848 9.848 0 0019.158 8c-1.442-3.658-5-6.25-9.167-6.25a9.704 9.704 0 00-3.316.583l1.8 1.8c.475-.191.983-.3 1.525-.3zM1.666 1.558l1.9 1.9.384.384A9.837 9.837 0 00.833 8c1.442 3.658 5 6.25 9.167 6.25 1.291 0 2.525-.25 3.65-.7l.35.35 2.441 2.433 1.059-1.058L2.725.5 1.666 1.558zm4.609 4.609l1.291 1.291A2.35 2.35 0 007.5 8c0 1.383 1.116 2.5 2.5 2.5.183 0 .366-.025.541-.067l1.292 1.292a4.13 4.13 0 01-1.833.442A4.168 4.168 0 015.833 8c0-.658.167-1.275.442-1.833zm3.591-.65l2.625 2.625.017-.134c0-1.383-1.117-2.5-2.5-2.5l-.142.009z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEyeClosed);
export default ForwardRef;
