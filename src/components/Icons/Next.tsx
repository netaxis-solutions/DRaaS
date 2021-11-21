import * as React from "react";

function SvgNext(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path d="M.917 5.583h6.918L5.717 8.127a.584.584 0 10.899.746l2.916-3.5a.694.694 0 00.053-.087c0-.03 0-.047.04-.076A.583.583 0 009.667 5a.583.583 0 00-.04-.21c0-.03 0-.047-.041-.076a.694.694 0 00-.053-.087l-2.916-3.5a.583.583 0 00-.899.746l2.118 2.544H.917a.583.583 0 100 1.166z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgNext);
export default ForwardRef;
