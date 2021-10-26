import Header from "@/component/Header";
import styles from "./index.less";
import { history, useDispatch } from "umi";
import { useState } from "react";

export default function goodsListNewPage() {
  const [mobile, setMobile] = useState<string>("13968066530");
  const [password, setPassword] = useState<string>("954321");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch({
      type: "userinfo/postApiUsersUserAccountsLogin",
      payload: {
        mobile,
        password,
      },
    });
  }

  return (
    <div className={styles.login}>
      <Header title={"Entrada"} />
      <img src={require("../../assets/img/logo2.png")} alt="" />
    </div>
  );
}
