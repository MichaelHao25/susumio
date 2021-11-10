import Header from "@/component/Header";
import styles from "./index.less";
import { history, useDispatch } from "umi";
import { useEffect, useState } from "react";
import Notiflix, { Notify } from "notiflix";
import { postFacebookLogin } from "@/services/api";
type Mode = "login" | "register";
export default function login() {
  const [mode, setMode] = useState<Mode>("login");
  const [mobile, setMobile] = useState<string>("13968066530");
  const [password, setPassword] = useState<string>("954321");
  const [checked, setChecked] = useState<boolean>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse();
    }
    window.checkLogin = (e: any) => {
      const {
        status = "",
        authResponse: { accessToken },
      } = e || {};
      if (status === "connected") {
        postFacebookLogin(accessToken).then((res) => {
          dispatch({
            type: "userinfo/login",
            payload: { res },
          });
        });
      }
    };
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
  const handleLogin = () => {
    dispatch({
      type: "userinfo/loginAsMobileOrMail",
      payload: {
        mobile,
        password,
      },
    });
  };
  const handleRegister = () => {
    if (!checked) {
      Notify.failure("Marque la cláusula de servicio");
      return;
    }
    dispatch({
      type: "userinfo/registerAsMobileOrMail",
      payload: {
        mobile,
        password,
      },
    });
  };
  //   const checkLoginState = ()=> {
  //     FB.getLoginStatus(function(response) {
  //       console.log(response);

  //     });
  //   }
  return (
    <div className={styles.login}>
      <Header title={""} />
      <img
        src={require("../../assets/img/logo2.png")}
        alt=""
        className={styles.log}
      />
      <div className={styles.maxWidth300}>
        <div className={styles.tab}>
          <div
            className={`${styles.item} ${mode === "login" && styles.active}`}
            onClick={() => {
              setMode("login");
            }}
          >
            INICIAR SESIÓN
          </div>
          <div
            className={`${styles.item} ${mode === "register" && styles.active}`}
            onClick={() => {
              setMode("register");
            }}
          >
            REGISTRARSE
          </div>
        </div>
        <div className={`${styles.input_container} ${styles.username}`}>
          <div className={styles.img_container}>
            <img src={require("../../assets/img/user-icon.svg")} alt="" />
          </div>
          <input
            type="text"
            placeholder={"Móvil / Email"}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </div>
        <div className={`${styles.input_container} ${styles.password}`}>
          <div className={styles.img_container}>
            <img src={require("../../assets/img/password-icon.svg")} alt="" />
          </div>
          <input
            type="password"
            placeholder={"Contraseña"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        {mode === "login" && (
          <div className={styles.lostPassword}>
            <a
              onClick={() => {
                Notiflix.Report.info(
                  "Póngase en contacto con nosotros：",
                  "邮箱 fernando777@126.com <br/>电话 008613968966530",
                  "ok",
                  () => {},
                  { plainText: false },
                );
              }}
            >
              ¿Te ha olvidado la contraseña?
            </a>
          </div>
        )}
        {mode === "login" && (
          <button className={styles.button} onClick={handleLogin}>
            INICIAR SESIÓN
          </button>
        )}
        <div
          className={styles.button_fb}
          style={{
            display: mode === "login" ? "block" : "none",
          }}
        >
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-width="280"
            data-button-type="continue_with"
            data-use-continue-as="true"
            data-scope="public_profile,email"
            data-onlogin={`checkLogin`}
          ></div>
        </div>

        {mode === "register" && (
          <button className={styles.button} onClick={handleRegister}>
            REGISTRARSE
          </button>
        )}
        {mode === "register" && (
          <div className={styles.rule}>
            <input
              className={`aui-checkbox ${styles.checkbox}`}
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <span>
              Acuerdo <a href="#">Condiciones de servicio</a>{" "}
              <a href="#">Política de privacidad</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
