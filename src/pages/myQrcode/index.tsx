import Header from "@/component/Header";
import { UserinfoState } from "@/pages/login/model";
import { postGetParams } from "@/services/api";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useSelector } from "umi";
import "./index.less";

export default () => {
  const [share_img, setShare_img] = useState<string>("");
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  useEffect(() => {
    postGetParams().then((res) => {
      if (res) {
        setShare_img(res.data.share_img);
      }
    });
  }, []);
  return (
    <div className={"myqrcode"}>
      <Header title={"Mi código binario"} />
      <div className="aui-content">
        <img
          loading="lazy"
          src={share_img ? share_img : require("../../assets/img/yaoqing.png")}
          style={{ width: "100%" }}
          id="img"
        />
        <QRCode
          value={`${window.location.origin}?parent_mobile=${user.mobile}`}
          className={"qrcode"}
        />
      </div>
    </div>
  );
};
