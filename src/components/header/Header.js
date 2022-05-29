import style from './Header.module.css'


function Header() {

    return (
      <div className={style.headerContent}>
          <div className={style.pokeRing1}></div>
          <div className={style.pokeRing2}></div>
          <div className={style.pokeRing3}></div>
          <div className={style.largeCircle}></div>
          <div className={style.mediumCircle}></div>
          <div className={style.smallCircle}></div>
        
          <img src="./imgs/logo.png" alt="" />
      </div>
    );
  }
export default Header