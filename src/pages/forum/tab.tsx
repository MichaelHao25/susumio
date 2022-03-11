import { NavLink } from "umi";

export default (props: IProps) => {
  return (
    <footer className="aui-bar aui-bar-tab">
      <NavLink
        to={"/forum"}
        exact={true}
        className="aui-bar-tab-item"
        activeClassName={"aui-active"}
      >
        <i className="aui-iconfont iconfont icon-shouye" />
        <div className="aui-bar-tab-label">Inicio</div>
      </NavLink>
      <NavLink
        to={"/forum/add"}
        className="aui-bar-tab-item"
        activeClassName={"aui-active"}
      >
        {/* <i className="aui-iconfont iconfont icon-leimupinleifenleileibie" style={{opacity:0}}/>
        <div className="aui-bar-tab-label"  style={{opacity:0}}>Subir producto</div> */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: "-20px",
          }}
        >
          <img
            src={require("../../assets/img/add_storehouse.svg")}
            alt=""
            style={{ width: "54px", height: "54px", margin: "0 auto" }}
          />
          <div className="aui-bar-tab-label" style={{ color: "#4eaaa9" }}>
            Publicar
          </div>
        </div>
      </NavLink>
      <NavLink
        to={"/forum/my"}
        className="aui-bar-tab-item"
        activeClassName={"aui-active"}
      >
        <i className="aui-iconfont iconfont icon-people" />
        <div className="aui-bar-tab-label">Mío</div>
      </NavLink>
    </footer>
  );
};
