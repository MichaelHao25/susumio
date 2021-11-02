import { useEffect } from "react";
import { useState } from "react";

export enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  MXN = "MXN",
  PEN = "PEN",
  CLP = "CLP",
  COP = "COP",
}
// 获取汇率
function fetchRate() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "APPCODE a49fd2bf1c7e475f9e7e2b6a5fe816ab");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://jisuhuilv.market.alicloudapi.com/exchange/convert?amount=10&from=USD&to=EUR",
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
export default () => {
  useEffect(() => {}, []);

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType>(
    CurrencyType.USD,
  );

  const [changeCurrencyType, sethangeCurrencyType] = useState<boolean>(false);
  return {
    CurrencyType,
    currentCurrency,
    setCurrentCurrency,
    changeCurrencyType,
    sethangeCurrencyType,
  };
};
