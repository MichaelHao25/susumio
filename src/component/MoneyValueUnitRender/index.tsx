import { useEffect } from "react";
import React from "react";
import useCurrencyManage, {
  CurrencyData,
  CurrencyType,
} from "@/hooks/useCurrencyManage";
import { useState } from "react";
import Big from "big.js";
import { Notify } from "notiflix";
interface Props {
  children?: number | string;
  afterSymbol?: string;
  // 标签模式，如果是标签的话就必须要value参数
  labelMode?: boolean;
}
const MoneySymbol = {
  [CurrencyType.USD]: "$",
  [CurrencyType.EUR]: "€",
  [CurrencyType.MXN]: "MXN $",
  [CurrencyType.PEN]: "PEN",
  [CurrencyType.CLP]: "CLP",
  [CurrencyType.COP]: "COP",
};

const index: React.FC<Props> & {
  getMoney: (value: string) => string;
} = (props) => {
  const { children: value, afterSymbol, labelMode } = props;
  useCurrencyManage();

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
  let returnString: React.ReactNode = "";
  if (!value) {
    // 如果value为空的话就只渲染符号
    returnString = MoneySymbol[currentCurrency];
  } else if (labelMode) {
    // 如果是标签模式的话就从当前汇率转换为美元
    returnString = `${currentCurrency} ${value} ≈ $ ${new Big(value)
      .div(rate)
      .toFixed(2)}`;
  } else if (rate === 0 || currentCurrency === CurrencyType.USD) {
    returnString = MoneySymbol[currentCurrency] + value;
  } else if (currentCurrency === CurrencyType.MXN) {
    returnString = (
      <span style={{ fontSize: ".5em" }}>
        {MoneySymbol[currentCurrency]}
        {new Big(value).times(rate).toFixed(2)}
      </span>
    );
  } else {
    returnString =
      MoneySymbol[currentCurrency] + new Big(value).times(rate).toFixed(2);
  }

  return (
    <>
      {afterSymbol || ""}
      {returnString}
    </>
  );
};
index.getMoney = (value) => {
  const currentCurrencyResponse = window.localStorage.getItem(
    "currentCurrencyResponse",
  );
  if (isNaN(parseFloat(value))) {
    Notify.failure("请输入正确的提现金额");
    return "0";
  }
  if (!currentCurrencyResponse) {
    Notify.failure("汇率缺失，请重新加载app");
    return "0";
  } else {
    const parseCurrencyResponse: CurrencyData = JSON.parse(
      currentCurrencyResponse,
    );
    const currentCurrency: CurrencyType =
      (window.localStorage.getItem("currentCurrency") as CurrencyType) ||
      CurrencyType.USD;
    // 如果当前的货币是美元的就不转换
    if (currentCurrency === CurrencyType.USD) {
      return value;
    } else {
      let camount = parseCurrencyResponse?.result?.camount;
      let rate = 0;
      if (camount) {
        rate = parseFloat(camount);
      }
      return new Big(value).div(rate).toFixed(2);
    }
  }
};
export default index;
