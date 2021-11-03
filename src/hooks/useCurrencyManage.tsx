import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

export enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  MXN = "MXN",
  PEN = "PEN",
  CLP = "CLP",
  COP = "COP",
}
export interface Response {
  status: 0;
  msg: "ok" | string;
  result: {
    from: "USD";
    to: CurrencyType;
    fromname: string;
    toname: string;
    updatetime: string;
    rate: string;
    camount: number;
  };
}
// 获取汇率
function fetchRate(currencyType: CurrencyType): Promise<Response> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "APPCODE a49fd2bf1c7e475f9e7e2b6a5fe816ab");

  const requestOptions: RequestInit = {
    method: "GET",
    // headers: myHeaders,
    redirect: "follow",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `https://jisuhuilv.market.alicloudapi.com/exchange/convert?AppCode=a49fd2bf1c7e475f9e7e2b6a5fe816ab&amount=10&from=USD&to=${currencyType}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        resolve(result);
      });
    //   .catch((error) => console.log("error", error));
  });
}
export default () => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType>(() => {
    return (
      (window.localStorage.getItem("currentCurrency") as CurrencyType) ||
      CurrencyType.USD
    );
  });

  const [changeCurrencyType, sethangeCurrencyType] = useState<boolean>(false);
  useEffect(() => {
    // 找到当前交易的币种默认是美元
    const currentCurrency =
      window.localStorage.getItem("currentCurrency") || CurrencyType.USD;
    // 找到从接口取到的汇率
    const oldCurrencyResponseString = window.localStorage.getItem(
      "currentCurrencyResponse",
    );
    if (currentCurrency === CurrencyType.USD) {
      // 如果货币是美元的话就不用处理，因为默认就是美元
      return;
    }
    // 如果本地存储没有response的话就重新请求接口
    if (oldCurrencyResponseString) {
      const oldCurrencyResponse: Response = JSON.parse(
        oldCurrencyResponseString,
      );
      const diff = moment(oldCurrencyResponse.result.updatetime).diff(
        moment(new Date()),
        "hours",
      );
      console.log(diff);
    } else {
      fetchRate(currentCurrency as CurrencyType).then((res) => {
        console.log(res);
      });
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("currentCurrency", currentCurrency);
  }, [currentCurrency]);
  return {
    CurrencyType,
    currentCurrency,
    setCurrentCurrency,
    changeCurrencyType,
    sethangeCurrencyType,
  };
};
