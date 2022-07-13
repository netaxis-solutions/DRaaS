import * as React from "react";

function SvgStrokeArrowRight(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M7.26777 15.738C7.62479 16.0873 8.20364 16.0873 8.56066 15.738L13.7322 10.6778C13.9322 10.4821 14.0202 10.2183 13.9961 9.96272C13.9973 9.73216 13.908 9.50125 13.7285 9.32537L8.55997 4.26221C8.20316 3.9126 7.62464 3.9126 7.26784 4.26221C6.91102 4.61174 6.91102 5.17845 7.26784 5.52798L11.836 10.003L7.26777 14.4729C6.91074 14.8223 6.91074 15.3887 7.26777 15.738Z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeArrowRight);
export default ForwardRef;
