import { SVGProps, Ref, forwardRef } from "react";

const SvgAlertOutline = (
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
      d="M11 1.85.917 19.415h20.166L11 1.85Zm0 3.698 6.903 12.018H4.098L11 5.548Zm-.917 3.698v3.698h1.834V9.246h-1.834Zm0 5.547v1.849h1.834v-1.85"
      fill="#F80"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgAlertOutline);
export default ForwardRef;
