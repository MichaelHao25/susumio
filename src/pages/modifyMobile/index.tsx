import Header from "@/component/Header";
import { useEffect, useState } from "react";
import {
  postGetParams,
  postUpdateEmail,
  postUpdateMobile,
} from "@/services/api";
import { Notify } from "notiflix";
import { history, useSelector } from "umi";
import { UserinfoState } from "@/pages/login/model";

export default () => {
  const [params, setParams] = useState<{
    wap_login_logo: string;
  }>({
    wap_login_logo: "",
  });
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const [mobile, setMobile] = useState<string>("");
  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
  }, []);

  function handleSubmit() {
    if (!mobile) {
      Notify.failure("Por favor,introduzca el número correcto");
      return;
    }
    postUpdateMobile({
      old_mobile: user.mobile,
      new_mobile: mobile,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.clear();
        history.push("/");
      }
    });
  }

  return (
    <>
      <Header title={"Modificar número de teléfono"} />
      <div id="app">
        {/* 中间页 */}
        <div className="aui-content aui-text-center">
          <img
            loading="lazy"
            src={params.wap_login_logo}
            style={{
              width: "65%",
              margin: "2.5rem auto 0 auto",
              marginBottom: "2rem",
            }}
          />
          <div className="area">
            <div className="mix">
              <i className="aui-iconfont aui-icon-mobile" />
              <input
                type="text"
                className="input short"
                placeholder="Nuevo número"
                value={mobile}
                pattern="[0-9]*"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>
            <div className="submit" onClick={handleSubmit}>
              Cambiar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
