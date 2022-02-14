import { SVGProps, Ref, forwardRef } from "react";

const SvgMsTeamLimk = (
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
      d="M8.334 12.5h-2.5c-1.417 0-2.5-1.084-2.5-2.5 0-1.417 1.083-2.5 2.5-2.5h2.5c.5 0 .833-.334.833-.834 0-.5-.333-.833-.833-.833h-2.5A4.126 4.126 0 0 0 1.667 10a4.126 4.126 0 0 0 4.167 4.166h2.5c.5 0 .833-.333.833-.833 0-.5-.333-.833-.833-.833Zm5.833-6.667h-2.5c-.5 0-.833.333-.833.833 0 .5.333.834.833.834h2.5c1.417 0 2.5 1.083 2.5 2.5 0 1.416-1.083 2.5-2.5 2.5h-2.5c-.5 0-.833.333-.833.833 0 .5.333.833.833.833h2.5A4.126 4.126 0 0 0 18.334 10a4.126 4.126 0 0 0-4.167-4.167ZM6.667 10c0 .5.333.833.833.833h5c.5 0 .834-.333.834-.833 0-.5-.334-.834-.834-.834h-5c-.5 0-.833.334-.833.834Z"
      fill="#fff"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgMsTeamLimk);
export default ForwardRef;
