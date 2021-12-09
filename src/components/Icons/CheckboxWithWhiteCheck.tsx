import { SVGProps, Ref, forwardRef } from "react";

const SvgCheckboxWithWhiteCheck = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M14.222 0H1.778C.8 0 0 .8 0 1.778v12.444C0 15.2.8 16 1.778 16h12.444C15.2 16 16 15.2 16 14.222V1.778C16 .8 15.2 0 14.222 0ZM6.853 11.813a.885.885 0 0 1-1.253 0l-3.191-3.19a.885.885 0 1 1 1.253-1.254l2.56 2.56 6.116-6.116a.885.885 0 1 1 1.253 1.254l-6.738 6.746Z" />
  </svg>
);

const ForwardRef = forwardRef(SvgCheckboxWithWhiteCheck);
export default ForwardRef;
