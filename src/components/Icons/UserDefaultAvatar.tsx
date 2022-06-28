import * as React from "react";

function SvgUserDefaultAvatar(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <circle cx={30} cy={30} r={30} fill="#EAEEFC" />
      <path
        d="M25 30a5.84 5.84 0 005.833-5.834A5.84 5.84 0 0025 18.333a5.84 5.84 0 00-5.834 5.833A5.84 5.84 0 0025 30zm0-8.334c1.383 0 2.5 1.117 2.5 2.5 0 1.384-1.117 2.5-2.5 2.5a2.497 2.497 0 01-2.5-2.5c0-1.383 1.116-2.5 2.5-2.5zm.083 16.667H17.95c1.65-.833 4.5-1.667 7.05-1.667.183 0 .383.017.566.017.567-1.217 1.55-2.217 2.734-3.017-1.217-.216-2.367-.333-3.3-.333-3.9 0-11.667 1.95-11.667 5.833v2.5H25v-2.5c0-.283.033-.566.083-.833zM37.5 34.166c-3.067 0-9.167 1.684-9.167 5v2.5h18.333v-2.5c0-3.316-6.1-5-9.166-5zm2.016-3.033c1.267-.717 2.15-2.067 2.15-3.633 0-2.3-1.866-4.167-4.166-4.167a4.168 4.168 0 00-4.167 4.167c0 1.566.883 2.916 2.15 3.633.6.333 1.283.533 2.017.533.733 0 1.416-.2 2.016-.533z"
        fill="#7AA2F8"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgUserDefaultAvatar);
export default ForwardRef;
