import s from './Header.module.scss'
import converterImg from '../../assets/image/convert.svg'
import singleImg from '../../assets/image/single.svg'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Header = () => {

  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState<number>()

  useEffect(() => {
    // Обработка изменений URL
    if (location.pathname === '/current-course') {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, [location.pathname]);

  return (
    <>
      <h1>Check live foreign currency exchange rates</h1>
      <main className={s.main}>
        <div className={s.wrapper}>
          <div className={s.header}>

            <Link to={'/'}>
              <div className={`${s.tab} ${activeIndex === 0 ? s.tabActive : ''}`}
              >
                <div className={s.tabIcon}>
                  <img src={converterImg} alt="converter images"/>
                </div>
                <div
                  className={s.tabTitle}
                >
                  Converter
                </div>
              </div>
            </Link>

            <Link to={'/current-course'}>
              <div className={`${s.tab} ${activeIndex === 1 ? s.tabActive : ''}`}
              >
                <div className={s.tabIcon}>
                  <img src={singleImg} alt="converter images"/>
                </div>
                <div
                  className={s.tabTitle}
                >
                  Current Page
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </>
  );
};

export default Header;
