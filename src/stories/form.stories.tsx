import { Checkbox } from "components/common/Form/FormCheckbox";
import { Input } from "components/common/Form/FormInput";
import { Select } from "components/common/Form/FormSelect";
import SearchInput from "components/common/SearchInput";
import {
  CheckboxType,
  InputPropsType,
  TSelectProps,
  SearchInputType,
} from "utils/types/form";

export default {
  title: "Form components",
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
  helperText: "",
};

export const SimpleSearch = (props: SearchInputType) => {
  return (
    <div style={defaultStyles}>
      <SearchInput {...props} />
    </div>
  );
};

SimpleSearch.args = {
  value: "",
  onChange: () => {},
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
  onChange: () => {},
};

export const SimpleSelect = (props: TSelectProps) => {
  return (
    <div style={defaultStyles}>
      <Select {...props} />
    </div>
  );
};

SimpleSelect.args = {
  label: "First Name",
  disabled: false,
  options: [
    { label: "James", value: "James" },
    { label: "Ann", value: "Ann" },
  ],
  onChange: () => {},
};
