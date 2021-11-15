import * as React from "react";

function SvgEdit(
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
      <path d="M.5 12.375V15.5h3.125l9.217-9.217-3.125-3.125L.5 12.375zm14.758-8.508a.83.83 0 000-1.175l-1.95-1.95a.83.83 0 00-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEdit);
export default ForwardRef;
