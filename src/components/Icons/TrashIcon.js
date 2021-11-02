import * as React from "react";

function SvgTrashIcon(props, svgRef) {
  return (
    <svg
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M1.00008 13.8333C1.00008 14.75 1.75008 15.5 2.66675 15.5H9.33342C10.2501 15.5 11.0001 14.75 11.0001 13.8333V3.83333H1.00008V13.8333ZM11.8334 1.33333H8.91675L8.08342 0.5H3.91675L3.08342 1.33333H0.166748V3H11.8334V1.33333Z"
        fill="#828282"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTrashIcon);
export default ForwardRef;
