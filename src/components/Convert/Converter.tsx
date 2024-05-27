import {useFormik} from "formik";
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {Rates} from "../../type/type.ts";
import CurrencyCard from "../CurrencyCard/CurrencyCard.tsx";
import makeApiRequest from "../../api/api.ts";
import {convertCurrency, optionsList} from "../../utils/utils.tsx";
import {SelectField} from "../SelectField/SelectField.tsx";
import {InputField} from "../InputField/InputField.tsx";
import s from './Convert.module.scss';
import arrowsImg from '../../assets/image/arrows.svg'
import equalsImg from "../../assets/image/equals.svg"

const Converter = () => {
  const [tickerCoins, setTickerCoins] = useState<string[]>([]);
  const [exchangeRates, setExchangeRates] = useState<Rates>({});

  const [valueFrom, setValueFrom] = useState<string>('BTC');
  const [valueTo, setValueTo] = useState<string>('BTC');

  const [coinNameFrom, setCoinNameFrom] = useState<string>('Bitcoin');
  const [coinNameTo, setCoinNameTo] = useState<string>('Bitcoin');

  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await makeApiRequest();
        setTickerCoins(Object.keys(data));
        setExchangeRates(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData()
  }, []);

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
    <form className={s.form} onSubmit={formik.handleSubmit}>
      <div className={s.formInputs}>

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


      <div className={s.formSelects}>
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

        <div className={s.formSelectIcon}>
          <img src={arrowsImg} alt="arrows" />
        </div>

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
      </div>

      </div>

      <div className={s.formResults}>
        <CurrencyCard id={'from'} tickerName={valueFrom} coinName={coinNameFrom} currencyValue={amount}/>
        <div className={s.formResultEquals}>
          <img src={equalsImg} alt={"equals image"}/>
        </div>
        <CurrencyCard id={'to'} tickerName={valueTo} coinName={coinNameTo} currencyValue={convertedAmount}/>
        <button className={s.convertedButton} type="submit">Converter</button>
      </div>

    </form>
  )
};

export default Converter;
