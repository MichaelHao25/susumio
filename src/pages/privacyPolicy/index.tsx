import Header from "@/component/Header";
import { postArticles } from "@/services/api";
import { useEffect, useState } from "react";
import { ConnectProps, history } from "umi";

interface Props
  extends ConnectProps<{}, {}, { type: string; id: string; title: string }> {}
export default (props: Props) => {
  const {
    location: { query: { title = "" } = {} },
  } = props;
  const [articles, setArticles] = useState<string>("");
  useEffect(() => {
    const {
      location: { query: { type = "", id = "" } = {} },
    } = props;
    if (type === "") {
      history.replace("/");
    }
    postArticles({
      type,
      id,
    }).then((res) => {
      console.log(res);
      if (res) {
        setArticles(res.data.content);
      }
    });
  }, []);
  return (
    <div>
      <Header title={title} />
      <div dangerouslySetInnerHTML={{ __html: articles }}></div>
    </div>
  );
};
