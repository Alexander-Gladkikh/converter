import {useFormik} from "formik";
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {Rates} from "../type/type.ts";
import CurrencyCard from "./CurrencyCard.tsx";
import makeApiRequest from "../api/api.ts";
import {convertCurrency, optionsList} from "../utils/utils.tsx";
import {SelectField} from "./SelectField.tsx";
import {InputField} from "./InputField.tsx";

const Converter = () => {
  const [tickerCoins, setTickerCoins] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<Rates>({});

  const [valueFrom, setValueFrom] = useState<string>('');
  const [valueTo, setValueTo] = useState<string>('');

  const [coinNameFrom, setCoinNameFrom] = useState<string>('Bitcoin');
  const [coinNameTo, setCoinNameTo] = useState<string>('Bitcoin');

  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(0);

  useEffect(() => {
    setTickerCoins(Object.keys(makeApiRequest()))
    setExchangeRates(makeApiRequest())
  }, [])

  const formik = useFormik({
    initialValues: {
      amount: 0,
      from: 'BTC',
      to: 'BTC'
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required').positive().min(0),
      from: Yup.string().required('Required'),
      to: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setValueFrom(values.from)
      setValueTo(values.to)
      setCoinNameFrom(exchangeRates[values.from].name)
      setCoinNameTo(exchangeRates[values.to].name)
      setAmount(values.amount)
      setConvertedAmount(convertCurrency(exchangeRates, values.from, values.to, values.amount))
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <InputField
        value={formik.values.amount}
        name={"amount"}
        id={"amount"}
        label={"amount"}
        type={"number"}
        error={formik.errors.amount}
        touched={formik.touched.amount}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <SelectField
        value={formik.values.from}
        name={"from"}
        id={"from"}
        label={"from"}
        error={formik.errors.from}
        touched={formik.touched.from}
        options={optionsList(tickerCoins)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <SelectField
        value={formik.values.to}
        name={"to"}
        id={"to"}
        label={"To"}
        error={formik.errors.to}
        touched={formik.touched.to}
        options={optionsList(tickerCoins)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <CurrencyCard tickerName={valueFrom} coinName={coinNameFrom} currencyValue={amount} />
      <CurrencyCard tickerName={valueTo} coinName={coinNameTo} currencyValue={convertedAmount} />

      <button type="submit">Converter</button>
    </form>
  )
};

export default Converter;
