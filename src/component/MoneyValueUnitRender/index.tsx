import { useEffect } from "react";
import React from "react";
import { CurrencyData, CurrencyType } from "@/hooks/useCurrencyManage";
import { useState } from "react";
import Big from "big.js";
interface Props {
  children: number | string;
}

const MoneySymbol = {
  [CurrencyType.USD]: "$",
  [CurrencyType.EUR]: "€",
  [CurrencyType.MXN]: "MXN $",
  [CurrencyType.PEN]: "PEN",
  [CurrencyType.CLP]: "CLP",
  [CurrencyType.COP]: "COP",
};
const index: React.FC<Props> = (props) => {
  const [rate] = useState<number>(() => {
    const res = window.localStorage.getItem("currentCurrencyResponse");
    if (res) {
      const parseRes: CurrencyData = JSON.parse(res);
      const camount = parseRes?.result?.camount;
      if (camount) {
        return parseFloat(camount);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
  const [currentCurrency] = useState<CurrencyType>((): CurrencyType => {
    return (
      (window.localStorage.getItem("currentCurrency") as CurrencyType) ||
      CurrencyType.USD
    );
  });
  useEffect(() => {}, []);
  const { children } = props;
  if (rate === 0 || currentCurrency === CurrencyType.USD) {
    return (
      <>
        {MoneySymbol[currentCurrency]}
        {children}
      </>
    );
  }
  return (
    <>
      {MoneySymbol[currentCurrency]}
      {new Big(children).times(rate).toFixed(2)}
    </>
  );
};

export default index;
