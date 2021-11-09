import Header from "@/component/Header";
import "./index.less";
import { history, useDispatch } from "umi";
import { useEffect, useState } from "react";
import { postFacebookLogin } from "@/services/api";

export default function goodsListNewPage() {
  const [mobile, setMobile] = useState<string>(() => {
    if (process.env.NODE_ENV === "development") {
      return "13968066530";
    } else {
      return "";
    }
  });
  const [password, setPassword] = useState<string>(() => {
    if (process.env.NODE_ENV === "development") {
      return "954321";
    } else {
      return "";
    }
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse();
    }
  }, [window.FB]);
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
    <div className="login">
      <Header title={"Entrada"} />

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
          {/*onclick="api.closeWin()"*/}
        </div>
        <div className="mix">
          <i
            className="iconfont icon-shouji"
            style={{ color: "#3fa0f9", fontSize: "20px" }}
          />
          <input
            type="tel"
            value={mobile}
            className="input"
            placeholder="Número de teléfono"
            id="mobile"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
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
        <div className="other" style={{ justifyContent: "space-between" }}>
          <div
            onClick={() => {
              history.push("/loginEmail");
            }}
          >
            Acceso por correo
          </div>
          {/*onclick="$util.openWindow('message_auth_login_win')"*/}
        </div>
        <div
          className="submit1"
          onClick={handleSubmit}
          style={{ backgroundColor: "#3fa0f9" }}
        >
          Listo
        </div>
        {/*onclick="app.doLogin()"*/}
        <div
          onClick={() => {
            history.push("/register");
          }}
          className="rigster"
          style={{ backgroundColor: "#fff" }}
        >
          Registro
          {/*onclick="$util.openWindow('register_win')"*/}
        </div>
        <div
          onClick={() => {
            history.push("/registerEmail");
          }}
          className="rigster"
          style={{ backgroundColor: "#fff" }}
        >
          Registro Email
        </div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-use-continue-as="true"
          data-scope="public_profile,email"
        ></div>
        {/* <div
          onClick={() => {
            try {
              FB.login(
                function (response = {}) {
                  if (response.authResponse) {
                    const { authResponse: { accessToken = "" } = {} } =
                      response;
                    console.log(accessToken);
                    postFacebookLogin(accessToken).then((res) => {
                      dispatch({
                        type: "userinfo/login",
                        payload: { res },
                      });
                    });
                  }
                },
                { scope: "public_profile,email" },
              );
            } catch (error) {
              console.log(error);
            }
          }}
          className="rigster"
          style={{ backgroundColor: "#fff" }}
        >
          使用Facebook登陆
        </div> */}

        {/*onclick="$util.openWindow('register_email_win')"*/}
      </div>
    </div>
  );
}
