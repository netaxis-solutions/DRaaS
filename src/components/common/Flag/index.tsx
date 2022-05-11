import { NetherlandFlag } from "components/Icons";

const flagsList = [{ countryCode: "nl", flag: <NetherlandFlag /> }];

const Flag: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  const lowerCaseCountryCode = countryCode.toLocaleLowerCase();

  return (
    <>
      {flagsList.find(flag => flag.countryCode === lowerCaseCountryCode)?.flag}
    </>
  );
};

export default Flag;
