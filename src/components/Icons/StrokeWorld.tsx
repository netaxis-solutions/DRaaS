import * as React from "react";

function SvgStrokeWorld(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.65 7.2h3.164c.062-1.739.323-3.324.73-4.544a8.46 8.46 0 01.252-.666A6.407 6.407 0 001.65 7.2zM8 0a8 8 0 100 16A8 8 0 008 0zm-.8 2.782a7.28 7.28 0 00-.138.38c-.344 1.032-.586 2.44-.647 4.038H7.2V2.782zm0 6.018h-.785c.061 1.598.303 3.006.647 4.038.045.136.091.262.138.38V8.8zm3.004 5.21A6.407 6.407 0 0014.35 8.8h-3.164c-.062 1.739-.323 3.324-.73 4.544a8.46 8.46 0 01-.252.666zm-.62-5.21H8.8v4.418c.047-.118.093-.244.138-.38.344-1.032.586-2.44.647-4.038zm0-1.6H8.8V2.782c.047.118.093.244.138.38.344 1.032.586 2.44.647 4.038zm1.602 0c-.062-1.739-.323-3.324-.73-4.544a8.45 8.45 0 00-.252-.666A6.407 6.407 0 0114.35 7.2h-3.164zm-5.39 6.81a8.472 8.472 0 01-.252-.666c-.407-1.22-.668-2.805-.73-4.544H1.65a6.407 6.407 0 004.146 5.21z"
        fill="#67748E"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgStrokeWorld);
export default ForwardRef;
