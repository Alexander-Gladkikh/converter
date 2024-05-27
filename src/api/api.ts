import axios from "axios";
import {Rates} from "../type/type.ts";

const makeApiRequest = async (): Promise<Rates> => {
  const options = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/exchange_rates',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-rPNQYY8uDxZT212zZ4xQZ3y2' }
  };

  try {
    const response = await axios.request(options);
    return response.data.rates;
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle this error or propagate it
  }
};

export default makeApiRequest;
