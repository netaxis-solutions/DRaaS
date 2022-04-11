import { NetherlandFlag } from "components/Icons";

const flagsList = [{ countryCode: "nl", flag: <NetherlandFlag /> }];

const Flag: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  return <>{flagsList.find(flag => flag.countryCode === countryCode)?.flag}</>;
};

export default Flag;
