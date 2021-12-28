import * as React from "react";

const SvgArrowDown = (
  props: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>,
) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M4.42 6.922a.871.871 0 0 0 0 1.231l4.92 4.926c.19.19.447.274.696.251a.868.868 0 0 0 .62-.255l4.922-4.922a.87.87 0 1 0-1.23-1.23l-4.351 4.35L5.65 6.922a.87.87 0 0 0-1.23 0Z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDown);
export default ForwardRef;
