import preval from "preval.macro";
import packageJson from "../../../../../package.json";

const buildTimestamp = preval`module.exports = new Date().getTime();`;

const BuildInfo: React.FC<any> = () => {
  return (
    <>
      <div>Current version: {packageJson.version}</div>
      <div>Last build: {`${new Date(buildTimestamp)}`}</div>
      <div>Last commit: {process.env.REACT_APP_GIT_SHA}</div>
    </>
  );
};

export default BuildInfo;
