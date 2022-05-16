import ReactCountryFlag from "react-country-flag";

const Flag: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: "20px",
        height: "15px !important",
        objectFit: "cover",
        borderRadius: "3px",
      }}
    />
  );
};

export default Flag;
