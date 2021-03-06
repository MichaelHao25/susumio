import Header from "@/component/Header";
import Notiflix, { Notify } from "notiflix";
import { useEffect, useState } from "react";
import { ConnectProps, Link, useDispatch } from "umi";
import styles from "./index.less";
type Mode = "login" | "register";
type IProps = ConnectProps<
  Record<string, string>,
  Record<string, unknown>,
  {
    parent_mobile: string;
  }
>;
export default function login(props: IProps) {
  const {
    location: {
      query: { parent_mobile },
    },
  } = props;
  const [mode, setMode] = useState<Mode>("login");
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
  const [checked, setChecked] = useState<boolean>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse();
    }
  }, [window.FB]);
  const handleLogin = () => {
    dispatch({
      type: "userinfo/loginAsMobileOrMail",
      payload: {
        mobile: mobile.trim(),
        password: password.trim(),
        parent_mobile,
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
        mobile: mobile.trim(),
        password: password.trim(),
        parent_mobile,
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
                  "Email:fernando777@126.com <br/>Whatsapp:008613968066530",
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
            data-onlogin={"checkLogin"}
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
              Acuerdo{" "}
              <Link
                to={
                  "/privacyPolicy?type=rules&id=5&title=Detalles del artículo"
                }
              >
                Condiciones de servicio
              </Link>{" "}
              <Link
                to={
                  "/privacyPolicy?type=rules&id=6&title=Detalles del artículo"
                }
              >
                Política de privacidad
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
