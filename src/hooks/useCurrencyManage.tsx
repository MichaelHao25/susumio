import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { postExchangeRate } from "@/services/api";
import { BaseResponse } from "@/services/interface";
import Notiflix from "notiflix";
import { useRef } from "react";

export enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  MXN = "MXN",
  PEN = "PEN",
  CLP = "CLP",
  COP = "COP",
}
export interface CurrencyData {
  status: 0;
  msg: "ok" | string;
  result: {
    from: "USD";
    to: CurrencyType;
    fromname: string;
    toname: string;
    updatetime: string;
    rate: string;
    camount: string;
  };
}
export interface Response extends BaseResponse {
  data: CurrencyData;
}
// 获取汇率
function fetchRate(
  currencyType: CurrencyType,
  prevCurrency: CurrencyType,
): void {
  postExchangeRate({
    from: CurrencyType.USD,
    to: currencyType,
  })
    .then((res: Response) => {
      if (res) {
        window.localStorage.setItem(
          "currentCurrencyResponse",
          JSON.stringify(res.data),
        );
      }
      if (prevCurrency !== currencyType) {
        window.location.reload();
      }
    })
    .catch((res) => {
      Notiflix.Report.failure(
        "警告",
        "使用了过期的汇率价格计算可能不准确请刷新页面",
        "好的",
      );
    });
}
export default () => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType>(() => {
    return (
      (window.localStorage.getItem("currentCurrency") as CurrencyType) ||
      CurrencyType.USD
    );
  });

  const prevCurrency = useRef<CurrencyType>(currentCurrency);

  const [changeCurrencyType, setChangeCurrencyType] = useState<boolean>(false);
  useEffect(() => {
    // 找到当前交易的币种默认是美元
    // 找到从接口取到的汇率
    const oldCurrencyResponseString = window.localStorage.getItem(
      "currentCurrencyResponse",
    );
    if (currentCurrency === CurrencyType.USD) {
      // 如果货币是美元的话就不用处理，因为默认就是美元
      if (prevCurrency.current !== currentCurrency) {
        window.location.reload();
      }
    } else {
      // 如果本地存储没有response的话就重新请求接口
      if (oldCurrencyResponseString) {
        const oldCurrencyResponse: CurrencyData = JSON.parse(
          oldCurrencyResponseString,
        );
        const diff = moment(new Date()).diff(
          moment(oldCurrencyResponse.result.updatetime),
          "hours",
        );
        // 如果过去了20小时就清除这个数据，下次打开的时候重新查询
        // 或者本次存储的币种发生了变化
        if (diff > 20 || oldCurrencyResponse.result.to !== currentCurrency) {
          fetchRate(currentCurrency as CurrencyType, prevCurrency.current);
        } else {
          if (prevCurrency.current !== currentCurrency) {
            window.location.reload();
          }
        }
      } else {
        fetchRate(currentCurrency as CurrencyType, prevCurrency.current);
      }
    }
  }, [currentCurrency]);
  useEffect(() => {
    window.localStorage.setItem("currentCurrency", currentCurrency);
  }, [currentCurrency]);

  return {
    CurrencyType,
    currentCurrency,
    setCurrentCurrency,
    changeCurrencyType,
    setChangeCurrencyType,
  };
};
