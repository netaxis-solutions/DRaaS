import SvgIcon from "@material-ui/core/SvgIcon";

type Props = {
  className: string;
};

const CheckboxIcon = ({ className }: Props) => {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ width: 16, height: 16 }}
      className={className}
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" />
    </SvgIcon>
  );
};

export default CheckboxIcon;
