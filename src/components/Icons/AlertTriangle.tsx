import { SVGProps, Ref, forwardRef } from "react";

export const SvgAlertTriangle = (
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
      d="M8.575 3.217 1.517 15a1.667 1.667 0 0 0 1.425 2.5h14.116a1.666 1.666 0 0 0 1.425-2.5L11.425 3.217a1.667 1.667 0 0 0-2.85 0v0ZM10 7.5v3.333M10 14.167h.008"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgAlertTriangle);
export default ForwardRef;
