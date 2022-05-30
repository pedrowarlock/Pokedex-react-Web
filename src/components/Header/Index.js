import style from "./Index.module.css";

function Header({ setSearch, searchData }) {
  function loadSearch(search) {
    const searchItem = searchData.find(
      (element) => element.name === search.toLowerCase()
    );
    if (searchItem) {
      fetch(searchItem.url)
        .then((response) => response.json())
        .then((data) => setSearch(data));
    } else {
      setSearch(undefined);
    }
  }
  return (
    <div className={style.headerContent}>
      <div className={style.pokeRing1}></div>
      <div className={style.pokeRing2}></div>
      <div className={style.pokeRing3}>
        <input
          type="text"
          className={style.search}
          style={{backgroundImage:"url('./imgs/icons-search.svg')"}}
          placeholder="Pesquisar..."
          onChange={(e) => loadSearch(e.target.value)}
        />
      </div>
      <div className={style.largeCircle}></div>
      <div className={style.mediumCircle}></div>
      <div className={style.smallCircle}></div>

      <img src="./imgs/logo.png" alt="" />
    </div>
  );
}
export default Header;
