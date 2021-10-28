import Header from "@/component/Header";
import List from "@/component/List";
import { postCommentsLists } from "@/services/api";
import { AllList } from "@/services/interface";

export default () => {
  return (
    <>
      <List
        header={<Header title={"Mi comentario"} />}
        type={AllList.postCommentsLists}
      />
    </>
  );
};
