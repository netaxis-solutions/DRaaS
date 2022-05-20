import { SVGProps, Ref, forwardRef } from "react";

const SvgSearch = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M1.887 10.992a6.429 6.429 0 0 0 8.5.528l4.256 4.255a.8.8 0 0 0 1.132-1.131l-4.257-4.256A6.432 6.432 0 0 0 6.238.003 6.437 6.437 0 0 0 1.887 1.89a6.435 6.435 0 0 0 0 9.103Zm1.131-7.97a4.838 4.838 0 0 1 7.89 5.27 4.837 4.837 0 0 1-9.306-1.85 4.8 4.8 0 0 1 1.416-3.421v.001Z"
      fill="#374151"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgSearch);
export default ForwardRef;
