import { Input } from "components/common/Form/FormInput";

export default {
  title: "Form components",
};

const defaultStyles = { maxWidth: 400, marginTop: 20 };

export const SimpleInput = (props) => (
  <Input style={defaultStyles} {...props} />
);

SimpleInput.args = {
  label: "First Name",
  disabled: false,
  defaultValue: "Karina",
  error: false,
  helperText: "",
};
