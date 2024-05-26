import axios from "axios";
import {Rates} from "../type/type.ts";

const makeApiRequest = () : Rates  => {
  let result = {};
  const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/exchange_rates',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-rPNQYY8uDxZT212zZ4xQZ3y2' }
  };

  axios
    .request(options)
    .then(function (response) {
      result = response.data.rates
    })
    .catch(function (error) {
      console.error(error);
    });
  return result
};

export default makeApiRequest;
