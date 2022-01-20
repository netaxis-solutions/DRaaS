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
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="7.5"
        fill="white"
        stroke="#484CBA"
      />
      <circle cx="8" cy="8" r="5" fill="#484CBA" />
    </SvgIcon>
  );
};

export default RadioButtonCheckedIcon;
