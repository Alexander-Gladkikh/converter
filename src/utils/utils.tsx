import {Rates} from "../type/type.ts";

export const optionsList = (tickerCoins: string[]) => {
  return tickerCoins.map((exchangeRate) => (
    <option key={exchangeRate} value={exchangeRate}>{exchangeRate.toUpperCase()}</option>
));
}


export const convertCurrency = (exchangeRates: Rates, currencyFrom: string, currencyTo: string, amount: number): number | undefined => {
  if (exchangeRates[currencyFrom]?.value && exchangeRates[currencyTo]?.value) {
    const bitcoinPriceFrom = exchangeRates[currencyFrom].value;
    const bitcoinPriceTo = exchangeRates[currencyTo].value;
    console.log(bitcoinPriceFrom, bitcoinPriceTo)
    const bitcoinAmount = amount / bitcoinPriceFrom; // Количество биткоинов в исходной валюте
    return  bitcoinAmount * bitcoinPriceTo; // Конвертированная сумма в целевую валюту

  } else {
    return undefined; // Если цены биткоина для указанных валют не найдены
  }
};
