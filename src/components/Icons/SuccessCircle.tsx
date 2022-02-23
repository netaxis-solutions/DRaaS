import { SVGProps, Ref, forwardRef } from "react";

const SvgSuccessCircle = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M10 1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9Zm3.78 7.47-4.32 4.32a.87.87 0 0 1-1.26 0l-1.98-1.98a.87.87 0 0 1 0-1.26.87.87 0 0 1 1.26 0l1.35 1.35 3.69-3.69a.87.87 0 0 1 1.26 0c.36.36.36.9 0 1.26Z"
      fill="#8BB439"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgSuccessCircle);
export default ForwardRef;
