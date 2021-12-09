import SvgIcon from "@material-ui/core/SvgIcon";

const CheckboxIcon: React.FC = () => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ width: 16, height: 16 }}
    >
      <path d="M0 0H16V16H0V0Z" />
      <path
        d="M13.3337 4L6.00033 11.3333L2.66699 8"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default CheckboxIcon;
