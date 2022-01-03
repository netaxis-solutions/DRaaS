export interface Tab {
  name: string;
  id: string;
  component: JSX.Element;
}

export interface TabsProps {
  tabs: Tab[];
  active?: string;
  onTabChange?: (tabID: string) => void;
}
