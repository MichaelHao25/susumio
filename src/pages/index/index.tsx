import Tab from '@/component/Tab';
import './index.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import SwiperCore, { Pagination } from 'swiper';
import { connect, ConnectProps, Dispatch, Link } from 'umi';
import React, { useEffect } from 'react';
import List from '@/component/List';
import { AllList } from '@/services/interface';

SwiperCore.use([Pagination]);

interface PageProps extends ConnectProps {
  dispatch: Dispatch;
}

const Header = () => {
  return (
    <>
      <div id="top">
        <div
          className="aui-list aui-media-list aui-list-noborder"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <div className="aui-list-item aui-list-item-middle aui-padded-l-5 aui-padded-r-5">
            <div className="aui-media-list-item-inner">
              <div className="aui-list-item-inner aui-text-center">
                <div className="aui-searchbar" id="search">
                  {/*onClick="$util.openWindow('search_page_win')"*/}
                  <div
                    className="aui-searchbar-input aui-border-radius "
                    id="search-header"
                  >
                    <i
                      className="aui-iconfont aui-icon-search"
                      style={{
                        color: '#666666!important',
                        marginRight: '-12.25rem',
                      }}
                    />
                    <input
                      type="search"
                      placeholder="Búsqueda"
                      className="aui-text-center"
                      id="search-input"
                      style={{
                        color: '#666666!important',
                        backgroundColor: '#fafafa!important: #fff!important',
                        width: '100%',
                      }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aui-content">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/e11a217b5b1325a6ede1b0b38a67f259.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/d0c8d9ddf599a2e09e3508db6f7a2d0d.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.177pinche.com/public/upload/article_images/20210527/e11a217b5b1325a6ede1b0b38a67f259.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
        <div className="product-tag aui-padded-t-15 ">
          <section className="aui-grid  aui-margin-l-5 aui-margin-r-5 aui-padded-t-15 aui-padded-b-15">
            <div
              className="aui-row aui-padded-t-15 "
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              <Link
                to={'/goodsListModel?customTag=Envío gratis&title=Envío gratis'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20210317/96184edac14b56a6b9bdd5c0d425ba12.gif"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">Envío gratis</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=USA&title=USA'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20210317/d963afcb3644c4c9522fffe66f6b75cd.png"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">USA</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=MÉXICO&title=MÉXICO'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20201122/1c7cbe0b5b20f603f33c68d329040fe8.png"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">MÉXICO</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=Otros países&title=Otros países'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20210317/a52daf9e04b101dfc7a69941c67a36e1.gif"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">Otros países</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=Bodega&title=Bodega'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20210317/1fdf75f2ec06e2c209599dd5e8f75d19.gif"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">Bodega</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=En México&title=En México'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20201122/b8efd9185685f111913a4a60c9d81350.jpg"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">En México</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=Tienda local&title=Tienda local'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20210527/218e24952a7d82e582f821f17d736d88.jpg"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">Tienda local</div>
              </Link>
              <Link
                to={'/goodsListModel?customTag=Ganar&title=Ganar'}
                className="aui-col-xs-3"
              >
                <img
                  src="https://www.177pinche.com/public/upload/goods_images/20201207/3769d2d8636d4f2ce506a8e8d336c79e.gif"
                  className="aui-padded-5"
                  style={{ margin: '0px auto', width: '55%' }}
                />
                <div className="aui-grid-label">Ganar</div>
              </Link>
            </div>
          </section>
        </div>

        <div className="aui-flex-col aui-flex-center ">
          <div className="aui-flex-item-12 ">
            <img
              src={require('../../assets/img/wntj-1.png')}
              className="aui-margin-t-10 aui-margin-b-10"
              style={{ width: '50%', margin: '0px auto' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(({}: {}) => ({}))(
  React.memo((props: PageProps) => {
    const { dispatch } = props;
    useEffect(() => {}, []);
    return (
      <div className="indexPage">
        <List
          header={<Header />}
          params={{}}
          bottom={'2.5rem'}
          type={AllList.postApiGoodsGoodsLists}
        />
        <div style={{ height: '2.5rem' }}></div>
        <Tab />
      </div>
    );
  }),
);
