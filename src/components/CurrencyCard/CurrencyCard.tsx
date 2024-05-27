import s from './CurrencyCard.module.scss'
import arrowFrom from '../../assets/image/arrowFrom.svg';
import arrowTo from '../../assets/image/arrowto.svg';

type PropsType = {
  tickerName: string
  coinName: string
  currencyValue: number | undefined
  id: string
}
const CurrencyCard = ({id, coinName, tickerName, currencyValue}: PropsType) => {
  return (
    <div className={s.resultItem}>
      <img
        className={`${s.icon} ${id === 'from' ? s.from : s.to}`}
        src={id === 'from' ? arrowFrom : arrowTo}
        alt="arrow image"
      />
      <div className={s.resultCoin}>
        <div className={s.resultCoinInfo}>
          {tickerName.toUpperCase()}
          <div style={{fontSize: "12px"}}>{coinName}</div>
        </div>
        <div style={{fontWeight: "bold"}}>{currencyValue?.toFixed(2)}</div>
      </div>

    </div>
  );
};

export default CurrencyCard;
