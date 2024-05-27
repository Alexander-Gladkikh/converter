import {useEffect, useState} from "react";
import makeApiRequest from "../api/api.ts";
import {Rates} from "../type/type.ts";
import {convertCurrency} from "../utils/utils.tsx";

const CurrentCourse = () => {

  const [ratesCurrency, setRatesCurrency] = useState<Rates>({});
  const [baseTickerCurrent, setBaseTickerCurrent] = useState<string>('btc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await makeApiRequest();
        setRatesCurrency(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData()
  }, []);


  const onHandlerButton = () => {
    setBaseTickerCurrent('usd')
  }

  const listItems = Object.keys(ratesCurrency).map((key) => (
    <li key={key}>
      <p>{key.toUpperCase()}</p>
      <p>{ratesCurrency[key].name}</p>
      <p>{convertCurrency(ratesCurrency, baseTickerCurrent, key, 1)}</p>
      <button>Remove</button>
    </li>
  ));

  return (
    <div>
      <div>
        <p>{ratesCurrency[baseTickerCurrent]?.name}</p>
        <p>{ratesCurrency[baseTickerCurrent]?.value}</p>
        <button onClick={onHandlerButton}>Change</button>
      </div>

      <div>
        <ul>
          {listItems}
        </ul>
      </div>

    </div>
  );
};

export default CurrentCourse;
