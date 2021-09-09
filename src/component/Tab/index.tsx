import styles from './index.less';

export default function IndexPage() {
  return (
    <footer className="aui-bar aui-bar-tab">
      <div className="aui-bar-tab-item aui-active">
        <i className="aui-iconfont iconfont icon-shouye" />
        <div className="aui-bar-tab-label">Inicio</div>
      </div>
      <div className="aui-bar-tab-item">
        <i className="aui-iconfont iconfont icon-leimupinleifenleileibie" />
        <div className="aui-bar-tab-label">Productos</div>
      </div>
      <div className="aui-bar-tab-item">
        <i className="aui-iconfont iconfont icon-gouwuche" />
        <div className="aui-bar-tab-label">Carro</div>
      </div>
      <div className="aui-bar-tab-item">
        <i className="aui-iconfont iconfont icon-people" />
        <div className="aui-bar-tab-label">Mi mío</div>
      </div>
    </footer>
  );
}
