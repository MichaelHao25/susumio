import "./index.less";
import { CartList } from "@/services/interface";
import React, { useEffect, useState } from "react";
import { ConnectProps, history, Link } from "umi";
import Tab from "@/component/Tab";
import {
  postCartsBatchDelete,
  postCartsLists,
  postCollectionsBatchDelete,
} from "@/services/api";
import Notiflix, { Confirm, Notify } from "notiflix";
import { GoodsList } from "@/pages/goodsDetails/SpecInfoSelect";
import MoneyValueUnitRender from "@/component/MoneyValueUnitRender";

interface Props extends ConnectProps<{}, {}, {}> {}

const index = (props: Props) => {
  const [edit, setEdit] = useState<number>(0);
  const [menu, setMenu] = useState<boolean>(false);
  const [selectList, setSelectList] = useState<number[]>([]);
  const [list, setList] = useState<CartList[]>([]);
  useEffect(() => {
    postCartsLists().then((res) => {
      if (res) {
        const { data = [] } = res;
        setList(data.filter((item: CartList) => item.goods_info));
      }
    });
  }, []);
  const selectAllStatus = (): boolean => {
    return selectList.length === list.length;
  };
  const getTotalMoney = () => {
    return list
      .filter((item) => selectList.includes(item.id))
      .reduce((a, b) => {
        return a + b.num * b.goods_info.sell_price;
      }, 0)
      .toFixed(2);
  };

  function handleSubmit() {
    const goodsList: GoodsList[] = list
      .filter((item) => selectList.includes(item.id))
      .map<GoodsList>((item) => {
        return {
          thum: item.goods_info.thum,
          name: item.goods_info.name,
          intro: item.goods_info.intro,
          spec_option_group: item.spec_group_info.spec_option_group,
          sell_price: item.goods_info.sell_price,
          num: item.num,
          id: item.id,
          goods_id: item.goods_id,
          goods_id_str: item.spec_group_id_str,
        };
      });
    if (goodsList.length == 0) {
      Notify.failure("No se ha seleccionado nada artículo.");
    } else {
      history.push("/orderConfirm", {
        goodsList: goodsList,
      });
    }
  }
  const removeCart = () => {
    if (selectList.length == 0) {
      Notify.failure("Seleccione los artículos que quiere quitar del carro");
      return;
    }
    Confirm.show(
      "ster",
      "Confirmar el cancel del producto seleccionado del carro.?",
      "Sí",
      "No",
      () => {
        postCartsBatchDelete(selectList).then((res) => {
          if (res) {
            Notify.success(res.msg);
            setList((list) => {
              return [...list.filter((item) => !selectList.includes(item.id))];
            });
            setSelectList([]);
          }
        });
      },
    );
  };
  const addFavorite = () => {
    if (selectList.length == 0) {
      Notify.failure("Seleccione los productos que quiere añadir al favorito.");
      return;
    }

    postCollectionsBatchDelete(selectList).then((res) => {
      if (res) {
        Notify.success(res.msg);
        setList((list) => {
          return [...list.filter((item) => !selectList.includes(item.id))];
        });
        setSelectList([]);
      }
    });
  };
  return (
    <div className="carList">
      <header
        className="aui-bar aui-bar-nav aui-bar-light"
        id="header"
        style={{ backgroundImage: "none" }}
      >
        <div className="aui-title">Carro</div>
        <a
          className="aui-pull-right aui-btn"
          style={{ color: "#358cff" }}
          onClick={() => {
            setMenu((e) => !e);
          }}
        >
          {menu ? "Completar" : "Edición"}
        </a>
      </header>

      <ul className="aui-list aui-media-list">
        {menu ? (
          <li>
            <div className="aui-list-item">
              <div className="aui-list-item-inner aui-text-right">
                <div
                  className="aui-btn aui-btn-info  aui-btn-outlined aui-font-size-12 aui-margin-r-10"
                  onClick={removeCart}
                >
                  Eliminar
                  {/*  移除购物车*/}
                </div>
                <div
                  className="aui-btn aui-btn-info aui-btn-outlined aui-font-size-12"
                  onClick={addFavorite}
                >
                  Añadir a favorito
                  {/*  添加收藏*/}
                </div>
              </div>
            </div>
          </li>
        ) : (
          <li></li>
        )}
        {list.map((cart) => {
          const { id } = cart;
          return (
            <li className="aui-list-item" key={id}>
              <div className="aui-media-list-item-inner">
                <div
                  className="aui-list-item-media"
                  style={{
                    width: "1.7rem",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    const newSelectList = [...selectList];
                    if (newSelectList.includes(id)) {
                      newSelectList.splice(newSelectList.indexOf(id), 1);
                    } else {
                      newSelectList.push(id);
                    }
                    setSelectList(newSelectList);
                  }}
                >
                  {selectList.includes(id) ? (
                    <i className="aui-iconfont iconfont icon-roundcheckfill aui-text-info  aui-font-size-18" />
                  ) : (
                    <i className="aui-iconfont iconfont icon-yuanxingweixuanzhong  aui-font-size-18 aui-text-pray" />
                  )}
                </div>
                <Link
                  className="aui-list-item-media"
                  style={{
                    width: "5rem",
                  }}
                  to={`/goodsDetails?id=${cart.goods_id}`}
                >
                  {/* 规格缩略图 */}
                  <img
                    loading="lazy"
                    src={cart.spec_group_info.thum || cart.goods_info.thum}
                    className="aui-list-img-sm"
                    style={{ border: "1px solid #f4f4f4" }}
                  />
                </Link>
                {/* 查看购物车详情 */}
                {edit === id ? (
                  <div
                    className="aui-list-item-inner"
                    style={{
                      alignItems: "flex-start",
                      margin: "0 0.2rem",
                    }}
                  >
                    <div className="aui-list-item-text aui-margin-t-10">
                      <div className="aui-list-item-text setnum">
                        <div className="aui-bar aui-bar-btn" id="demo">
                          <div className="aui-bar-btn-item aui-font-size-14">
                            <i className="aui-iconfont aui-icon-minus" />
                          </div>
                          <div className="aui-bar-btn-item">
                            <input
                              type="number"
                              readOnly
                              className="aui-input aui-text-center"
                              id="count"
                              value={cart.num}
                            />
                          </div>
                          <div className="aui-bar-btn-item aui-font-size-20">
                            <i className="aui-iconfont aui-icon-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="aui-list-item-text aui-margin-t-10"
                      style={{
                        border: "1px solid #dedede",
                        borderRadius: "2px",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-padded-b-5 aui-text-pray">
                        Especificaciones:{" "}
                        {cart.spec_group_info.spec_option_group}
                      </div>
                      <i className="aui-iconfont aui-icon-down aui-pull-right aui-font-size-12 aui-padded-r-5" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="aui-list-item-inner"
                    style={{
                      alignItems: "flex-start",
                    }}
                  >
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-font-size-12">
                        {cart.goods_info.name}
                      </div>
                    </div>
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-text-pray">
                        {cart.goods_info.intro}
                      </div>
                    </div>
                    <div className="aui-list-item-text">
                      <div className="aui-list-item-title aui-font-size-12 aui-padded-t-5 aui-text-pray">
                        Especificaciones:
                        {cart.spec_group_info.spec_option_group}
                      </div>
                    </div>
                    <div className="aui-list-item-text aui-margin-t-10">
                      <span className="aui-text-price aui-font-size-14">
                        {/* <span
                          className="aui-text-price"
                          style={{ fontSize: "0.5rem" }}
                        >
                          $
                        </span> */}
                        <span>
                          {/* 规格价格 */}
                          <MoneyValueUnitRender>
                            {cart.spec_group_info.sell_price}
                          </MoneyValueUnitRender>
                          {/* 商品价格 */}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                {/* 设置单个购物车编辑状态按钮 */}
                {edit === id ? (
                  <div
                    className=" aui-wanch"
                    style={{
                      width: "4rem",
                    }}
                    onClick={() => setEdit(0)}
                  >
                    Listo
                  </div>
                ) : (
                  <div
                    className="aui-list-item-media"
                    style={{
                      width: "1.7rem",
                    }}
                  >
                    {/*购物车的编辑按钮*/}
                    {/* <a className="aui-pull-right" onClick={() => setEdit(id)}>
                    <span className="aui-iconfont iconfont icon-icon-" />
                    </a> */}
                    <i
                      className="aui-iconfont aui-icon-close aui-font-size-12"
                      style={{ position: "absolute", bottom: "0.5rem" }}
                    >
                      {cart.num}
                    </i>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <footer className="aui-bar aui-bar-tab" id="checkout">
        <div
          className="selectall aui-padded-l-15"
          onClick={() => {
            if (selectList.length === list.length) {
              setSelectList([]);
            } else {
              setSelectList(() => {
                return list.map((item) => item.id);
              });
            }
          }}
        >
          {selectAllStatus() ? (
            <i className="aui-iconfont iconfont icon-roundcheckfill aui-text-info aui-font-size-18" />
          ) : (
            <i
              className="aui-iconfont iconfont icon-yuanxingweixuanzhong aui-font-size-18"
              style={{ color: "#777" }}
            />
          )}
          <span>Todo</span>
        </div>
        <div className="price">
          Total:
          {/* <span className="aui-font-size-14 aui-text-price">$</span> */}
          <span className="aui-text-price aui-font-size-20">
            <MoneyValueUnitRender>{getTotalMoney()}</MoneyValueUnitRender>
          </span>
        </div>
        <div className="submit" onClick={handleSubmit}>
          Pagar
        </div>
      </footer>
      <div style={{ height: "2.25rem" }}></div>
      <div style={{ height: "2.5rem" }}></div>
      <Tab />
    </div>
  );
};

index.wrappers = ["@/wrappers/auth"];
export default index;
