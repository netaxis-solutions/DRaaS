import SvgIcon from "@material-ui/core/SvgIcon";

const CheckboxIcon: React.FC = () => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ width: 16, height: 16 }}
    >
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z"
        fill="#484CBA"
        stroke="none"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.5638 11.7295L2.2765 8.41481C1.91407 8.04935 1.90702 7.44955 2.26077 7.07512C2.61452 6.70069 3.1951 6.69342 3.55753 7.05888L6.19756 9.72092L12.4346 3.27748C12.7927 2.90751 13.3733 2.90751 13.7314 3.27748C14.0895 3.64745 14.0895 4.24729 13.7314 4.61726L6.85492 11.7214C6.50058 12.0889 5.92501 12.0938 5.56486 11.7306L5.5638 11.7295Z"
        fill="white"
        stroke="none"
      />
    </SvgIcon>
  );
};

export default CheckboxIcon;
