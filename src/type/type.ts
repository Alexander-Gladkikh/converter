type Rate = {
  name: string;
  unit: string;
  value: number;
  type: string;
};

export type Rates = {
  [currency: string]: Rate;
};

export type CurrencyRates = {
  rates: Rates;
};
