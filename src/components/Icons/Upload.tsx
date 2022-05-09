import { SVGProps, Ref, forwardRef } from "react";

const SvgUpload = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 7.9a.6.6 0 0 1 .6.6V10a.4.4 0 0 0 .4.4h7a.4.4 0 0 0 .4-.4V8.5a.6.6 0 1 1 1.2 0V10a1.6 1.6 0 0 1-1.6 1.6h-7A1.6 1.6 0 0 1 .9 10V8.5a.6.6 0 0 1 .6-.6ZM5.576 1.076a.6.6 0 0 1 .849 0l2 2a.6.6 0 0 1-.849.849L6 2.349 4.425 3.925a.6.6 0 1 1-.849-.849l2-2Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 1.9a.6.6 0 0 1 .6.6v7a.6.6 0 1 1-1.2 0v-7a.6.6 0 0 1 .6-.6Z"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgUpload);
export default ForwardRef;
