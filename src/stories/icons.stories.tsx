import * as Icons from "../components/Icons";

export default {
  title: "Icons",
};

const pairs = Object.entries(Icons);

export const Collection = ({
  size = 14,
  color,
}: {
  size: number;
  color: string;
}) => (
  <div
    style={{
      display: "flex",
      flexFlow: "row wrap",
      color,
      fontSize: `${size}px`,
    }}
  >
    {pairs.map(([name, Icon]) => (
      <div
        key={name}
        style={{ margin: "1em", textAlign: "center", color: "red" }}
      >
        <Icon style={{ height: "3em", fill: "red", color: "red" }} />
        <h4>{name}</h4>
      </div>
    ))}
  </div>
);

Collection.argTypes = {
  color: {
    control: {
      type: "select",
      options: ["red", "blue"],
    },
  },
  size: {
    control: "number",
    defaultValue: 14,
  },
};
