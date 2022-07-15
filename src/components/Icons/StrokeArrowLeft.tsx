import * as React from "react";

function SvgStrokeArrowLeft(
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
      <path d="M12.7322 4.262C12.3752 3.91267 11.7964 3.91267 11.4393 4.262L6.26777 9.3222C6.06784 9.51788 5.97981 9.7817 6.00388 10.0373C6.00274 10.2678 6.09199 10.4988 6.27154 10.6746L11.44 15.7378C11.7968 16.0874 12.3754 16.0874 12.7322 15.7378C13.089 15.3883 13.089 14.8215 12.7322 14.472L8.16398 9.997L12.7322 5.52706C13.0893 5.17772 13.0893 4.61133 12.7322 4.262Z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeArrowLeft);
export default ForwardRef;
