export interface Tab {
  name: string | {} | JSX.Element;
  id: string;
  component: () => JSX.Element | JSX.Element;
}

export interface TabsProps {
  tabs: Tab[];
  active?: string;
  url: string;
  onTabChange?: (tabID: string) => void;
}
