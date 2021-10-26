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
      <Header title={""} />
      <img src={require("../../assets/img/logo2.png")} alt="" />
      <div className="tab">
        <div className="item">INICIAR SESIÓN</div>
        <div className="item">REGISTRARSE</div>
      </div>
      <div className="username">
        <img src={require("../../assets/img/user-icon.svg")} alt="" />
        <input type="text" placeholder={"Móvil / Email"} />
      </div>
      <div className="password">
        <img src={require("../../assets/img/password-icon.svg")} alt="" />
        <input type="password" placeholder={"Contraseña"} />
      </div>
      <div className="lostpassword">
        <a
          onClick={() => {
            history.push("/resetPassword", {
              type: 1,
            });
          }}
        >
          ¿Te ha olvidado la contraseña?
        </a>
      </div>
    </div>
  );
}
