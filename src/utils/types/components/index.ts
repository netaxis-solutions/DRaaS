export type ChildrenInProps = {
  children: React.ReactNode;
};

export type TCardForTable = {
  content: string;
  customEvent: () => void;
  buttonName: string;
  icon?: React.FC;
  tooltip?: React.ReactElement;
};
