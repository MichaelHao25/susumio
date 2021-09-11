import { NavLink } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <footer className="aui-bar aui-bar-tab">
      <NavLink
        to={'/'}
        className="aui-bar-tab-item"
        activeClassName={'aui-active'}
      >
        <i className="aui-iconfont iconfont icon-shouye" />
        <div className="aui-bar-tab-label">Inicio</div>
      </NavLink>
      <NavLink
        to={'/dddd'}
        className="aui-bar-tab-item"
        activeClassName={'aui-active'}
      >
        <i className="aui-iconfont iconfont icon-leimupinleifenleileibie" />
        <div className="aui-bar-tab-label">Productos</div>
      </NavLink>
      <NavLink
        to={'/dddd'}
        className="aui-bar-tab-item"
        activeClassName={'aui-active'}
      >
        <i className="aui-iconfont iconfont icon-gouwuche" />
        <div className="aui-bar-tab-label">Carro</div>
      </NavLink>
      <NavLink
        to={'/dddd'}
        className="aui-bar-tab-item"
        activeClassName={'aui-active'}
      >
        <i className="aui-iconfont iconfont icon-people" />
        <div className="aui-bar-tab-label">Mi mío</div>
      </NavLink>
    </footer>
  );
}
