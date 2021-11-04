import Header from "@/component/Header";
import React, { useEffect, useState } from "react";
import Notiflix, { Confirm, Notify } from "notiflix";
import { history, useDispatch, useSelector } from "umi";
import {
  postCommissionApply,
  postGetParams,
  postQueryPayPassword,
  PostUsersUpdate,
  postUsersUpdate,
} from "@/services/api";
import { UserinfoState } from "@/pages/login/model";
import "./index.less";
import Upload from "@/component/Upload";

export default () => {
  const [params, setParams] = useState<{
    version: string;
  }>({
    version: "0",
  });
  const [isCloseWallet, setIsCloseWallet] = useState<boolean>(true);
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const dispatch = useDispatch();
  if (!user) {
    throw "user error";
  }
  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
    postQueryPayPassword().then((res) => {
      console.log(res);
      if (res) {
        if (res.data.is_set_pay_password === 1) {
          setIsCloseWallet(true);
        } else {
          setIsCloseWallet(false);
        }
      }
    });
  }, []);
  const logout = () => {
    Confirm.show("warning", "¿Va a salir?", "Sí", "No", () => {
      FB.logout();
      window.localStorage.clear();
      history.push("/");
    });
  };
  const updateUserInfo = (req: PostUsersUpdate) => {
    postUsersUpdate(req).then((res) => {
      if (res) {
        dispatch({
          type: "userinfo/setState",
          payload: {
            user: res.data,
          },
        });
      }
    });
  };
  const handleModifyName = () => {
    Notiflix.Confirm.show(
      "Introduzca un nuevo apodo",
      `<input type="text" class="confirm_password"/>`,
      "OK",
      "Cancelar",
      function () {
        const input: HTMLInputElement | null =
          document.querySelector(".confirm_password");
        if (input) {
          const value = input.value;
          if (value !== "") {
            updateUserInfo({
              nick_name: value,
            });
          }
        }
      },
      function () {},
    );
  };
  const passwordSetting = () => {
    if (isCloseWallet) {
      // 已经设置了支付密码
      Notiflix.Confirm.show(
        "Elige",
        `${[
          "Cambiar contraseña",
          "Restablecer contraseña",
          "Cambiar contraseña de pago",
          "Restablecer contraseña de pago",
        ]
          .map((item, index) => {
            return `<button class="layout_button">${item}</button>`;
          })
          .join("")}`,
        "Ok",
        "Cancelar",
        () => {},
        () => {},
        {
          messageMaxLength: 500,
        },
      );
      const handleClick = (index: number) => () => {
        document
          .querySelector<HTMLDivElement>("div#NotiflixConfirmWrap")
          ?.remove();
        if (index === 1 || index === 3) {
          history.push("/resetPassword", {
            type: index,
          });
        }
        if (index === 2 || index === 4) {
          history.push("/restPasswordEmail", {
            type: index,
          });
        }
      };
      document
        .querySelectorAll<HTMLButtonElement>(".layout_button")
        .forEach((element, index) => {
          element.addEventListener("click", handleClick(index + 1));
        });
    } else {
      Notiflix.Confirm.show(
        "Elige",
        "",
        "Cambiar contraseña",
        "Cancelar",
        () => {
          history.push("/resetPassword", {
            type: 1,
          });
        },
        () => {},
      );
    }
  };
  return (
    <div>
      <Header title={"Configuración"} />
      <div className="aui-content aui-margin-b-10">
        <ul className="aui-list aui-list-in aui-margin-b-5">
          {/* data-click="injectUplpadFile();" */}
          <Upload
            uploadSuccessCallback={(e) => {
              updateUserInfo({
                avatar: e.host_file_path,
              });
            }}
          >
            <li className="aui-list-item">
              <div className="aui-list-item-media">
                <img
                  loading="lazy"
                  src={user.avatar}
                  className="aui-img-round aui-list-img-sm"
                  id="avatar"
                />
              </div>
              <div
                className="aui-list-item-inner aui-list-item-arrow"
                style={{ width: "100%" }}
              >
                <div
                  className="aui-list-item-right aui-text-right"
                  style={{
                    fontSize: "0.8rem",
                    color: "#999",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  Cambiar imagen
                </div>
              </div>
            </li>
          </Upload>
          <li className="aui-list-item" onClick={handleModifyName}>
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Apodo</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: "0.8rem", color: "#999" }}
              >
                {user.nick_name ? user.nick_name : "Usuario anónimo"}
              </div>
            </div>
          </li>
          <li
            className="aui-list-item"
            // data-click="modify('email')"
            onClick={() => {
              history.push("/modifyEmail");
            }}
          >
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Correo electrónico</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: "0.8rem", color: "#999" }}
              >
                {user.email}
              </div>
            </div>
          </li>
          <li
            className="aui-list-item"
            // data-click="modify('mobile')"
            onClick={() => {
              history.push("/modifyMobile");
            }}
          >
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Número de teléfono</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: "0.8rem", color: "#999" }}
              >
                {user.mobile}
              </div>
            </div>
          </li>
          <li
            className="aui-list-item"
            // data-click="passwordSetting()"
            onClick={passwordSetting}
          >
            <div className="aui-list-item-inner aui-list-item-arrow">
              Configuración de contraseñas
            </div>
          </li>
          {/*指纹支付*/}
          {/*{isCloseWallet ? (*/}
          {/*  <li*/}
          {/*    className="aui-list-item"*/}
          {/*    data-onclick="$util.openWindow('fingerprint_win')"*/}
          {/*  >*/}
          {/*    <div className="aui-list-item-inner aui-list-item-arrow">*/}
          {/*      Pago de huellas*/}
          {/*    </div>*/}
          {/*  </li>*/}
          {/*) : (*/}
          {/*  ''*/}
          {/*)}*/}
        </ul>
        <ul className="aui-list aui-list-in aui-margin-b-10">
          <li
            className="aui-list-item"
            data-onclick="$util.openWindow('help_and_option_win')"
          >
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">
                Calificar esta aplicación
              </div>
            </div>
          </li>
          <li className="aui-list-item">
            <div className="aui-list-item-inner">
              <div className="aui-list-item-title" style={{ width: "75%" }}>
                Network Technology
              </div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: "0.8rem", color: "#999" }}
              >
                {params.version}
              </div>
            </div>
          </li>
        </ul>
        <div className="area">
          <div
            className="submit"
            onClick={logout}
            style={{ backgroundColor: "rgb(53, 140, 255)" }}
          >
            Desconectar
          </div>
        </div>
      </div>
    </div>
  );
};
