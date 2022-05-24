import * as React from "react";

function SvgArrowLeft(
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
      <path d="M6.48515 1.56344L6.44138 1.60281L3.17926 4.57781C3.06879 4.67844 3 4.82937 3 4.99781C3 5.16625 3.07087 5.31719 3.17926 5.41781L6.43512 8.39062L6.48932 8.44094C6.54143 8.47812 6.60396 8.5 6.67066 8.5C6.85201 8.5 7 8.33812 7 8.13687V1.86312C7 1.66187 6.85201 1.5 6.67066 1.5C6.60188 1.5 6.53726 1.52406 6.48515 1.56344Z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgArrowLeft);
export default ForwardRef;
