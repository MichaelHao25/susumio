import React, { useEffect, useRef } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
// @ts-ignore
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import { AllList } from '@/services/interface';
import { ListState } from '@/models/list';

interface PageProps {
  dispatch: Dispatch;
  Header?: React.FC;
  top?: string;
  bottom?: string;
  type: AllList;
  list: ListState;
}

export default connect(({ list }: { list: ListState }) => {
  return {
    list,
  };
})(
  React.memo((props: PageProps) => {
    const miniRefresh = useRef<any>();
    const { Header = '', top = '', bottom = '', dispatch, type, list } = props;
    const page = useRef({
      pageLimit: 10,
      pageNum: 1,
    });
    const loadData = (reload = false) => {
      switch (type) {
        case AllList.postApiGoodsGoodsLists: {
          if (reload) {
            page.current.pageNum = 1;
          }
          dispatch({
            type: 'list/postApiGoodsGoodsLists',
            payload: {
              ...page.current,
              cb(data = []) {
                page.current.pageNum = page.current.pageNum + 1;
                miniRefresh.current.endDownLoading(true);
                console.log(data.length);
                if (data.length < 10) {
                  miniRefresh.current.endUpLoading(true);
                } else {
                  miniRefresh.current.endUpLoading(false);
                }
              },
            },
          });
        }
      }
    };
    useEffect(() => {
      miniRefresh.current = new MiniRefreshTools.theme.defaults({
        // isUseBodyScroll:true,
        down: {
          callback: () => {
            loadData(true);
          },
        },
        up: {
          callback: () => {
            loadData(false);
          },
        },
      });
    }, []);

    function getList() {
      switch (type) {
        case AllList.postApiGoodsGoodsLists: {
          return list.postApiGoodsGoodsLists.map((value) => {
            return (
              <div
                key={value.id}
                className="aui-flex-item-6"
                style={{ position: 'relative', padding: '3px' }}
              >
                <img src={value.thum} /> {/**/}
                <h5
                  className="aui-text-default aui-ellipsis-2 aui-font-size-12 aui-padded-t-5 aui-padded-l-5 aui-padded-r-5 aui-bg-white"
                  style={{ height: '2rem', marginBottom: 0 }}
                >
                  {value.name}
                </h5>{' '}
                <p
                  style={{ marginBottom: 0 }}
                  className="aui-padded-b-5 aui-padded-t-5 aui-padded-l-10 aui-padded-r-10 aui-bg-white "
                >
                  <span className="aui-text-price aui-font-size-10">$</span>{' '}
                  <span className="aui-text-price ">{value.sell_price}</span>
                </p>
              </div>
            );
          });
        }
      }
    }

    return (
      <div className={styles.container}>
        <div
          id="minirefresh"
          className="minirefresh-wrap"
          style={{ top: top ? top : '0', bottom: bottom ? bottom : '0' }}
        >
          <div className="minirefresh-scroll">
            {Header ? <Header /> : <></>}
            <div
              className="aui-flex-col "
              style={{ backgroundColor: 'rgb(244, 244, 244)' }}
            >
              {getList()}
            </div>
          </div>
        </div>
      </div>
    );
  }),
);
