import { SVGProps, Ref, forwardRef } from "react";

const SvgSipTrunkingListItem = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={18}
    height={17}
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M8 3C8 2.44772 8.44772 2 9 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H9C8.44772 4 8 3.55228 8 3Z"
      fill="#67748E"
    />
    <path
      d="M8 8C8 7.44772 8.44772 7 9 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H9C8.44772 9 8 8.55228 8 8Z"
      fill="#67748E"
    />
    <path
      d="M8 13C8 12.4477 8.44772 12 9 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H9C8.44772 14 8 13.5523 8 13Z"
      fill="#67748E"
    />
    <path
      d="M6 2.89171V4.10361C6 4.60272 5.92793 5.03476 5.78378 5.39973C5.64364 5.76471 5.43944 6.06573 5.17117 6.30281C4.90691 6.53988 4.59059 6.71613 4.22222 6.83155C3.85786 6.94385 3.45345 7 3.00901 7C2.65265 7 2.32032 6.96413 2.01201 6.89238C1.7037 6.82063 1.42543 6.70989 1.17718 6.56016C0.932933 6.40731 0.722723 6.21702 0.546547 5.98931C0.37037 5.76159 0.234234 5.4902 0.138138 5.17513C0.046046 4.86007 0 4.5029 0 4.10361V2.89171C0 2.38636 0.0700701 1.95276 0.21021 1.59091C0.354354 1.22906 0.560561 0.92959 0.828829 0.692513C1.0971 0.455437 1.41341 0.280749 1.77778 0.168449C2.14615 0.0561497 2.55255 0 2.997 0C3.35335 0 3.68368 0.0358734 3.98799 0.10762C4.2963 0.179367 4.57457 0.290107 4.82282 0.43984C5.07107 0.589572 5.28128 0.778298 5.45345 1.00602C5.62963 1.23373 5.76376 1.50512 5.85586 1.82019C5.95195 2.13213 6 2.4893 6 2.89171ZM4.12613 4.2861V2.69987C4.12613 2.46591 4.10811 2.26315 4.07207 2.09158C4.04004 1.91689 3.99199 1.76872 3.92793 1.64706C3.86787 1.5254 3.79179 1.42714 3.6997 1.35227C3.60761 1.27741 3.5015 1.22282 3.38138 1.1885C3.26527 1.15107 3.13714 1.13235 2.997 1.13235C2.82082 1.13235 2.66266 1.16043 2.52252 1.21658C2.38238 1.27273 2.26426 1.36163 2.16817 1.48329C2.07207 1.60183 1.998 1.76248 1.94595 1.96524C1.8979 2.16488 1.87387 2.40976 1.87387 2.69987V4.2861C1.87387 4.52005 1.88989 4.72438 1.92192 4.89906C1.95796 5.07375 2.00601 5.22348 2.06607 5.34826C2.13013 5.46992 2.20821 5.56974 2.3003 5.64773C2.39239 5.72259 2.4985 5.77718 2.61862 5.8115C2.73874 5.84581 2.86887 5.86297 3.00901 5.86297C3.18519 5.86297 3.34134 5.83645 3.47748 5.78342C3.61361 5.72727 3.72973 5.63837 3.82583 5.51671C3.92593 5.39193 4 5.22816 4.04805 5.0254C4.1001 4.82264 4.12613 4.5762 4.12613 4.2861Z"
      fill="#67748E"
    />
    <path
      d="M1.32 14.8193H1.44C1.88 14.8193 2.266 14.7802 2.598 14.7021C2.93 14.6209 3.208 14.5007 3.432 14.3414C3.66 14.1789 3.832 13.9775 3.948 13.7369C4.064 13.4933 4.158 13.1794 4.158 13.1794L4.17 12.0408L4.158 11.5C4.158 11.2657 4.094 11.0881 4.038 10.9163C3.986 10.7414 3.908 10.5962 3.804 10.4806C3.7 10.365 3.578 10.2791 3.438 10.2229C3.298 10.1667 3.144 10.1386 2.976 10.1386C2.8 10.1386 2.644 10.1745 2.508 10.2463C2.376 10.3182 2.262 10.415 2.166 10.5368C2.07 10.6586 1.998 10.7961 1.95 10.9491C1.902 11.1022 1.878 11.2584 1.878 11.4177C1.878 11.5895 1.902 11.7503 1.95 11.9003C2.002 12.0502 2.076 12.1814 2.172 12.2938C2.268 12.4063 2.39 12.4953 2.538 12.5609C2.686 12.6234 2.858 12.6546 3.054 12.6546C3.25 12.6546 3.42 12.6265 3.564 12.5703C3.712 12.5141 3.836 12.4391 3.936 12.3454C4.04 12.2517 4.17 12.0408 4.17 12.0408L4.158 13.1794C3.95 13.3449 3.708 13.4777 3.432 13.5776C3.16 13.6745 2.87 13.7229 2.562 13.7229C2.162 13.7229 1.802 13.6667 1.482 13.5542C1.166 13.4418 0.898 13.284 0.678 13.081C0.458 12.8748 0.29 12.6312 0.174 12.3501C0.058 12.0689 0 11.7597 0 11.4224C0 11.0913 0.072 10.7805 0.216 10.49C0.36 10.1963 0.564 9.93864 0.828 9.71687C1.092 9.49509 1.406 9.32017 1.77 9.1921C2.138 9.06403 2.544 9 2.988 9C3.424 9 3.824 9.0656 4.188 9.19679C4.552 9.32485 4.87 9.50915 5.142 9.74967C5.414 9.99018 5.624 10.2822 5.772 10.6258C5.924 10.9694 6 11.3568 6 11.7878V12.2938C6 12.7561 5.932 13.1809 5.796 13.5683C5.66 13.9556 5.46 14.2992 5.196 14.5991C4.936 14.8989 4.62 15.1535 4.248 15.3628C3.88 15.5721 3.462 15.7314 2.994 15.8407C2.53 15.9469 2.022 16 1.47 16H1.32V14.8193Z"
      fill="#67748E"
    />
  </svg>
);

const ForwardRef = forwardRef(SvgSipTrunkingListItem);
export default ForwardRef;
