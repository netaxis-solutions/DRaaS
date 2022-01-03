// import React from "react";
import Tabs from "components/Tabs";
import { Tab } from "utils/types/tabs";
import MyNumbers from "./TabsContent/MyNumbers";

const tabs: Tab[] = [
  { name: "My numbers", id: "mine", component: <MyNumbers /> },
  {
    name: "Deleted numbers",
    id: "deleted",
    component: <div>Deleted numbers</div>,
  },
  {
    name: "Reserved numbers",
    id: "reserved",
    component: <div>Reserved numbers</div>,
  },
  { name: "Porting", id: "porting", component: <div>Porting</div> },
];

function Numbers({}) {
  return <Tabs tabs={tabs} />;
}

export default Numbers;
