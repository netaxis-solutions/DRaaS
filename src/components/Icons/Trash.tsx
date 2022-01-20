import { SVGProps, Ref, forwardRef } from "react";

const SvgTrash = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={12}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path d="M1 13.833c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667v-10H1v10Zm10.833-12.5H8.917L8.083.5H3.917l-.834.833H.167V3h11.666V1.333Z" />
  </svg>
);

const ForwardRef = forwardRef(SvgTrash);
export default ForwardRef;
