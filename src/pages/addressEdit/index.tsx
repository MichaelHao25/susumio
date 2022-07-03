import Header from "@/component/Header";
import {
  postAddressesCreate,
  postFreightTemplate,
  postQueryAddressById,
} from "@/services/api";
import { AddressItem } from "@/services/interface";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import { ConnectProps, history } from "umi";

type Props = ConnectProps<
  Record<string, string>,
  {
    addressId?: number;
  },
  Record<string, string>
>;

interface Provinces {
  name: string;
  id: number;
  citys: string[];
}

interface Address {
  id: number;
  is_default: number;
  address: string;
  area_code: string;
  city_code: string;
  consignee_name: string;
  express_type: string;
  mobile: string;
  province: string;
  province_code: string;
  zip_code: string;
}
export interface FreightTemplate {
  country: string;
  country_code: string;
  express: string;
}
interface ProvincesList {
  [key: string]: string;
}

export default (props: Props) => {
  const {
    location: { state: { addressId = "" } = {} },
  } = props;
  const [provinces, setProvinces] = useState<ProvincesList>({});
  const [freightTemplate, setFreightTemplate] = useState<FreightTemplate[]>([]);
  const [address, setAddress] = useState<Address>({
    id: 0,
    address: "",
    area_code: "",
    city_code: "",
    consignee_name: "",
    express_type: "",
    is_default: 1,
    mobile: "",
    province: "",
    province_code: "",
    zip_code: "",
  });
  useEffect(() => {
    // postRegions().then((res) => {
    //   if (res) {
    //     setProvinces(res.data);
    //   }
    // });
    postFreightTemplate().then((res) => {
      if (res) {
        console.log(res);
        const {
          data,
        }: {
          data: FreightTemplate[];
        } = res;
        const list: ProvincesList = {};

        data.forEach((item) => {
          list[item.country_code] = item.country;
        });
        console.log(list);
        setProvinces(list);

        setFreightTemplate(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (addressId) {
      if (Object.keys(provinces).length !== 0) {
        postQueryAddressById(addressId).then((res) => {
          if (res) {
            console.log(res);
            setAddress(res.data);
          }
        });
      }
    }
  }, [addressId, provinces]);

  function submit() {
    if (
      !address.province_code ||
      !address.consignee_name ||
      !address.mobile ||
      !address.address
    ) {
      Notify.failure("Por favor rellene la información completa.");
      return;
    }
    postAddressesCreate(address as AddressItem).then((res) => {
      console.log(res);
      if (res) {
        Notify.success(res.msg);
        history.goBack();
      }
    });
  }

  return (
    <>
      <Header title={"Mi dirección"} />
      <div className="aui-content aui-margin-b-15">
        <ul className="aui-list aui-form-list">
          <li>
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">Nombre</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <input
                  type="text"
                  placeholder="Introduzca el nombre del destinatario"
                  value={address.consignee_name}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        consignee_name: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">Teléfono</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <input
                  type="text"
                  pattern="[0-9]*"
                  placeholder="Por favor,introduzca el teléfono."
                  value={address.mobile}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        mobile: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">Código postal</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <input
                  type="text"
                  placeholder="Código postal"
                  value={address.zip_code}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        zip_code: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">País</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <select
                  value={address.province_code}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        province_code: e.target.value,
                        express_type: "",
                      };
                    });
                  }}
                >
                  <option value={""}>Seleccione la País</option>
                  {Object.entries(provinces).map(([key, value]) => {
                    return (
                      <option value={key} key={key}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </li>
          <li className="FastClick">
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">Envio</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <select
                  value={address.express_type}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        express_type: e.target.value,
                      };
                    });
                  }}
                >
                  <option value="">Seleccione la Envio</option>
                  {freightTemplate
                    .filter(
                      (item) => item.country_code === address.province_code,
                    )
                    .map((item) => {
                      return (
                        <option key={item.express} value={item.express}>
                          {item.express}
                        </option>
                      );
                    })}

                  {/* <option value="Express 9-14días">Express 9-14días</option>
                  <option value="Barco 20-25días">Barco 20-25días</option> */}
                </select>
              </div>
            </div>
          </li>
          <li>
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label" style={{ width: "65%" }}>
                Dirección detallada
              </div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <textarea
                  placeholder="Introduzca la dirección detallada "
                  value={address.address}
                  onChange={(e) => {
                    setAddress((address) => {
                      return {
                        ...address,
                        address: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </li>
          <li className="FastClick">
            <div className="aui-margin-l-15">
              <div className="aui-list-item-label">Predeterminar</div>
              <div className="aui-margin-l-15 aui-list-item-input">
                <label>
                  <input
                    className="aui-radio"
                    type="radio"
                    onChange={(e) => {
                      setAddress((address) => {
                        return {
                          ...address,
                          is_default: e.target.checked ? 1 : 0,
                        };
                      });
                    }}
                    checked={address.is_default ? true : false}
                  />
                  Sí
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    className="aui-radio"
                    type="radio"
                    onChange={(e) => {
                      setAddress((address) => {
                        return {
                          ...address,
                          is_default: !e.target.checked ? 1 : 0,
                        };
                      });
                    }}
                    checked={!address.is_default ? true : false}
                  />
                  No
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div style={{ height: "2.5rem" }} />
      <footer className="aui-bar aui-bar-tab">
        <div
          className="aui-bar-tab-item aui-padded-l-15 aui-padded-r-15"
          onClick={submit}
          id="footer"
        >
          <div className="aui-btn aui-btn-block aui-btn-sm aui-btn-info">
            Presentación
          </div>
        </div>
      </footer>
    </>
  );
};
