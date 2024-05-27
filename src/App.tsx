import Converter from "./components/Convert/Converter.tsx";
//import CurrentCourse from "./components/CurrentCourse.tsx";
import s from './App.module.scss'
import Header from "./components/Header/Header.tsx";

function App() {

  return (
    <div className={s.container}>
      <h1>Check live foreign currency exchange rates</h1>
      <main className={s.main}>
        <div className={s.wrapper}>
          <Header />
        </div>
      </main>
      <Converter/>
      {/*<CurrentCourse />*/}
    </div>
  )
}

export default App
