import TextComponent from "components/Routes/Text";

export default {
  title: "Dashboard/cards",
};

export const Patient = (props: { text: string; color: string }) => (
  <TextComponent {...props} />
);
Patient.args = {
  text: "AAAAAAA",
};
Patient.argTypes = {
  color: {
    control: {
      type: "select",
      options: ["red", "blue"],
    },
  },
};
