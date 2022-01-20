import SvgIcon from "@material-ui/core/SvgIcon";

type Props = {
  className: string;
};

const RadioButtonCheckedIcon = ({ className }: Props) => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ width: 16, height: 16 }}
      className={className}
    >
      <path
        d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z"
        stroke="none"
      />
    </SvgIcon>
  );
};

export default RadioButtonCheckedIcon;
