import * as React from "react";

const SvgArrowUp = (
  props: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>,
) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M19.58 17.078a.871.871 0 0 0 0-1.231l-4.92-4.926a.868.868 0 0 0-.696-.251.868.868 0 0 0-.62.255l-4.922 4.922a.87.87 0 1 0 1.23 1.23l4.351-4.35 4.346 4.351c.34.34.89.34 1.23 0Z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowUp);
export default ForwardRef;
