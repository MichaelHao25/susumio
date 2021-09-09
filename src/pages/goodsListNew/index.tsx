import Header from '@/component/Header';
import './index.less';

export default function goodsListNewPage() {
  return (
    <div className="goodsListNew">
      <Header title={'Entrada'} />

      <div className="aui-title" style={{ left: '0rem', right: '0rem' }}>
        {/*onClick="$util.openWindow('search_page_win')"*/}
        <div className="aui-searchbar aui-bg-white" id="search">
          <div className="aui-searchbar-input aui-border-radius aui-bg-default">
            <i className="aui-iconfont aui-icon-search" />
            <input
              type="search"
              placeholder="Buscar lo que quieres"
              id="search-input"
              disabled
            />
            <div className="aui-searchbar-clear-btn">
              <i className="aui-iconfont aui-icon-close" />
            </div>
          </div>
          <div className="aui-searchbar-btn">Cancelar</div>
        </div>
      </div>

      {/* 类目 */}
      <div className="aui-clearfix categ">
        {/* 左侧一级类目 */}
        <ul className="aui-col-xs-3 inner">
          <li className="active">Mochilas y bolsas</li>
          <li>Celular y accesorios</li>
          <li>Vestidos</li>
          <li>Ganar dinero</li>
          <li>Servicios Mio</li>
          <li>Tienda Local</li>
          <li>Papelería</li>
          <li>Hogar y Regalos</li>
          <li>Juguetes</li>
          <li>Bisuteria,reloj y gafas</li>
          <li>Belleza y maquillaje</li>
        </ul>
        {/* 右侧二级类目 */}
        <div className="aui-col-xs-9 aui_grid">
          <div>
            <img src="https://www.177pinche.com/public/upload/article_images/20190726/f9b6991c87826650c32f1047e72273b8.png" />
            {/*@click="goModel(cate_ad)"*/}
          </div>
          <div>
            <h1
              className="aui-font-size-16 aui-padded-t-15"
              v-text="propsName"
            />

            <ul className="category">
              <li>
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20190720/2eddb79e36127a5d2519c83fe641e439.png"
                  style={{ width: '80%', height: '3.5rem' }}
                />
                <div className="aui-grid-label aui-padded-t-5">Bolsas</div>
              </li>
              <li>
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20190806/932dfb885d9911f7bf161941908a1e60.JPG"
                  style={{ width: '80%', height: '3.5rem' }}
                />
                <div className="aui-grid-label aui-padded-t-5">Cartera</div>
              </li>
              <li>
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20190720/6ca2a5933cbca607b570a98970110af2.png"
                  style={{ width: '80%', height: '3.5rem' }}
                />
                <div className="aui-grid-label aui-padded-t-5">Mochilas</div>
              </li>
              <li>
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20200324/16cff05a5816eb615b4b4bb34ee92b0a.png"
                  style={{ width: '80%', height: '3.5rem' }}
                />
                <div className="aui-grid-label aui-padded-t-5">Maleta</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
