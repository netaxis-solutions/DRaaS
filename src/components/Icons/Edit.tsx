import * as React from "react";

function SvgEdit(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M11.3335 1.99992C11.5086 1.82482 11.7165 1.68593 11.9452 1.59117C12.174 1.4964 12.4192 1.44763 12.6668 1.44763C12.9145 1.44763 13.1597 1.4964 13.3884 1.59117C13.6172 1.68593 13.8251 1.82482 14.0002 1.99992C14.1753 2.17501 14.3142 2.38288 14.4089 2.61166C14.5037 2.84043 14.5524 3.08563 14.5524 3.33325C14.5524 3.58087 14.5037 3.82607 14.4089 4.05484C14.3142 4.28362 14.1753 4.49149 14.0002 4.66658L5.00016 13.6666L1.3335 14.6666L2.3335 10.9999L11.3335 1.99992Z"
        stroke="#374151"
        fill="transparent"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgEdit);
export default ForwardRef;
