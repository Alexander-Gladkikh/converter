

type PropsType = {
  tickerName: string
  coinName: string
  currencyValue: number | undefined
}
const CurrencyCard = ({coinName, tickerName, currencyValue}: PropsType) => {
  return (
    <div>
      <img src="" alt=""/>
      <div>
        <p>{tickerName.toUpperCase()}</p>
        <p style={{color: "red"}}>{coinName}</p>
        <p>{currencyValue}</p>
      </div>
    </div>
  );
};

export default CurrencyCard;
