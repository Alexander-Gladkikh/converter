import {useEffect, useState} from "react";
import makeApiRequest from "../../api/api.ts";
import {Rates} from "../../type/type.ts";
import {convertCurrency, optionsList} from "../../utils/utils.tsx";
import Header from "../Header/Header.tsx";
import s from './CurrentCourse.module.scss'
import {SelectField} from "../SelectField/SelectField.tsx";
import {useFormik} from "formik";
import * as Yup from "yup";

const CurrentCourse = () => {

  const [tickerCoins, setTickerCoins] = useState<string[]>([]);
  const [ratesCurrency, setRatesCurrency] = useState<Rates>({});
  const [baseTickerCurrent, setBaseTickerCurrent] = useState<string>('btc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await makeApiRequest();
        setTickerCoins(Object.keys(data));
        setRatesCurrency(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData()
  }, []);

  const formik = useFormik({
    initialValues: {
      select: ''
    },
    validationSchema: Yup.object({
      select: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setBaseTickerCurrent(values.select)
    },
  });

  const listItems = Object.keys(ratesCurrency).map((key) => (
    <li className={s.select} key={key}>
      <div>{key.toUpperCase()}</div>
      <div>{ratesCurrency[key].name}</div>
      <div>{convertCurrency(ratesCurrency, baseTickerCurrent, key, 1)}</div>
      <button>Remove</button>
    </li>
  ));

  return (
    <div className={s.container}>
      <Header/>
      <div className={s.currencyWrapper}>
        <div className={s.currencySingle}>
          <form className={s.form} onSubmit={formik.handleSubmit}>
            <SelectField
              value={formik.values.select}
              name={"select"}
              id={"select"}
              label={"select"}
              error={formik.errors.select}
              touched={formik.touched.select}
              options={optionsList(tickerCoins)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}/>

            <button className={s.changeButton} type={"submit"}>Change</button>
          </form>

        </div>

        <div className={s.currencyList}>
          <ul style={{listStyleType: 'none'}}>
            {listItems}
          </ul>
        </div>

      </div>
    </div>

  );
};

export default CurrentCourse;
