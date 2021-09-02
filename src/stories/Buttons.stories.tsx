import ButtonsComponent from "components/Routes/Buttons";

export default {
  title: "Dashboard/btn",
};

export const Patient = (props: { test: string; color: string }) => (
  <ButtonsComponent {...props} />
);
Patient.args = {
  test: "567890",
  color: "white",
};
Patient.argTypes = {
  color: {
    control: {
      type: "select",
      options: ["red", "blue", "white"],
    },
  },
};
