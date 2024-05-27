import s from './Header.module.scss'
import converterImg from '../../assets/image/convert.svg'
import singleImg from '../../assets/image/single.svg'
import {useState} from "react";
const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className={s.header}>

      <div className={`${s.tab} ${activeIndex === 0 ? s.tabActive : ''}`}>
        <div className={s.tabIcon}>
          <img src={converterImg} alt="converter images"/>
        </div>
        <div
          className={s.tabTitle}
          onClick={() => setActiveIndex(0)}
        >
          Converter</div>
      </div>

      <div className={`${s.tab} ${activeIndex === 1 ? s.tabActive : ''}`}>
        <div className={s.tabIcon}>
          <img src={singleImg} alt="converter images"/>
        </div>
        <div
          className={s.tabTitle}
          onClick={() => setActiveIndex(1)}
        >
          Converter</div>

      </div>
    </div>
  );
};

export default Header;
