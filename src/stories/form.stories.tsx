import { Checkbox } from "components/common/Form/FormCheckbox";
import { Input } from "components/common/Form/FormInput";
import { CheckboxType, InputPropsType } from "utils/types/form";

export default {
  title: "Form components"
};

const defaultStyles = { margin: 20, maxWidth: 400 };

export const SimpleInput = (props: InputPropsType) => {
  return (
    <div style={defaultStyles}>
      <Input {...props} />
    </div>
  );
};

SimpleInput.args = {
  label: "First Name",
  disabled: false,
  defaultValue: "Karina",
  error: false,
  helperText: ""
};

export const SimpleCheckbox = (props: CheckboxType) => {
  return (
    <div style={defaultStyles}>
      <Checkbox {...props} />
    </div>
  );
};

SimpleCheckbox.args = {
  label: "First Name",
  disabled: false,
  defaultChecked: true,
  onChange: () => {}
};
