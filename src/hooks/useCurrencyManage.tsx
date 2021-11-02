import { useState } from "react";

export enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  MXN = "MXN",
  PEN = "PEN",
  CLP = "CLP",
  COP = "COP",
}
export default () => {
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
