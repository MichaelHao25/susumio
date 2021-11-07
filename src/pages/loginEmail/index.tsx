import Header from "@/component/Header";
import "./index.less";
import { history } from "umi";
import { useState } from "react";
import { postLoginAsEmail, postRegisterAsEmail } from "@/services/api";
import { Notify } from "notiflix";
import fbShareCheck from "@/utils/fbShareCheck";

export default () => {
  const [email, setEmail] = useState<string>("18600899806");
  const [password, setPassword] = useState<string>("123456");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  function handleSubmit() {
    if (!password) {
      Notify.failure("Rellene la contraseña");
      return;
    }
    if (!/^[A-Za-z0-9]{6,20}$/.test(password)) {
      Notify.failure(
        "La combinación de letras y números se limita a 6 a 20 bits",
      );
      return;
    }
    if (!email) {
      Notify.failure("El buzón no puede estar vacío");
      return;
    }
    if (!/^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(email)) {
      Notify.failure("Formato de correo incorrecto");
      return;
    }
    postLoginAsEmail({
      email,
      password,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.setItem("userinfo", JSON.stringify(res.data));
        window.localStorage.setItem("token", res.data.token.token);
        fbShareCheck({});
      }
    });
  }
  return (
    <div className="messageAuthLogin">
      <Header title={"Código de verificación de mensajes"} />
      <div className="area aui-text-center">
        <div
          style={{
            height: "7.5rem",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            loading="lazy"
            src="https://www.177pinche.com/public/upload/user_images/20190701/52f0b7ea6656a4af7484d6503e2f0a51.png"
            style={{ width: "60%" }}
          />
        </div>
        <div className="mix">
          <i
            className="iconfont icon-youxiang"
            style={{ color: "#3fa0f9", fontSize: "20px" }}
          />
          <input
            type="input"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Correo electrónico"
            // value="email"
            id="email"
          />
        </div>
        <div className="mix">
          <i
            className="iconfont icon-mima"
            style={{ color: "#3fa0f9", fontSize: "20px" }}
          />
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            id="password"
          />
          <i
            className={`iconfont ${
              showPassword ? "icon-yanjing_xianshi" : "icon-yanjing_yincang"
            }`}
            style={{
              color: "#bbbbbb",
              fontSize: "20px",
              marginRight: "0.7rem",
            }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
        <div className="other">
          <p
            onClick={() => {
              history.push("/login");
            }}
          >
            Código de cuenta
          </p>
          {/*click="$util.openWindow('login_win')"*/}
        </div>
        <div className="submit1" style={{ backgroundColor: "#3fa0f9" }}>
          Entrada
        </div>
        {/*click="app.doLogin()"*/}
      </div>
    </div>
  );
};
