import { SVGProps, Ref, forwardRef } from "react";

const SvgResellerLevelIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={27}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12.375 6.75h3.375l3.701-3.712a1.125 1.125 0 0 1 1.598 0l2.902 2.914a1.125 1.125 0 0 1 0 1.586l-2.576 2.587h-9v2.25a1.125 1.125 0 0 1-2.25 0V9a2.25 2.25 0 0 1 2.25-2.25Zm-6.75 5.625v4.5L3.05 19.452a1.125 1.125 0 0 0 0 1.586l2.902 2.914a1.127 1.127 0 0 0 1.598 0l4.826-4.827h4.5A1.125 1.125 0 0 0 18 18v-1.125h1.125a1.125 1.125 0 0 0 1.125-1.125v-1.125h1.125A1.125 1.125 0 0 0 22.5 13.5v-1.125h-7.875V13.5a2.25 2.25 0 0 1-2.25 2.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-3.375l-2.25 2.25Z"
      fill="#C2C3E8"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgResellerLevelIcon);
export default ForwardRef;
