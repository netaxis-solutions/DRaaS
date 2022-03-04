import { SVGProps, Ref, forwardRef } from "react";

const SvgUnlink = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M15.583 6.417h-3.667v1.741h3.667A2.844 2.844 0 0 1 18.425 11c0 1.31-.899 2.41-2.118 2.75l1.338 1.32c1.495-.76 2.521-2.283 2.521-4.07a4.583 4.583 0 0 0-4.583-4.583Zm-.917 3.666H12.66l1.833 1.834h.174v-1.834ZM1.833 3.914l2.85 2.851a4.575 4.575 0 0 0-1.508 7.476 4.583 4.583 0 0 0 3.241 1.342h3.667v-1.741H6.416A2.844 2.844 0 0 1 3.575 11a2.839 2.839 0 0 1 2.53-2.814l1.897 1.897h-.669v1.834h2.503l2.08 2.08v1.586h1.586l3.676 3.667 1.155-1.155L2.997 2.75 1.833 3.914Z"
      fill="#fff"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgUnlink);
export default ForwardRef;
