import * as React from "react";

function SvgStrokeLoader(
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
        d="M.837.002c.47-.028.88.316.935.784l.224 1.927a8.001 8.001 0 0113.942 4.288.889.889 0 11-1.764.22A6.223 6.223 0 002.893 4.444h2.44a.889.889 0 010 1.778H.89A.889.889 0 010 5.333V.89C0 .418.367.029.837.002zM.834 8.007a.889.889 0 01.992.772 6.224 6.224 0 0011.281 2.777h-2.44a.889.889 0 110-1.778h4.444c.491 0 .889.398.889.889v4.444a.889.889 0 01-1.772.103l-.224-1.927A8.001 8.001 0 01.062 8.999a.889.889 0 01.772-.992z"
        fill="#323D69"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeLoader);
export default ForwardRef;
