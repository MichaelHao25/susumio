import Header from "@/component/Header";
import List from "@/component/List";
import { AllList } from "@/services/interface";

export default () => {
  return (
    <List
      header={<Header title={"Mis huellas"} />}
      type={AllList.postUserFootLists}
    />
  );
};
