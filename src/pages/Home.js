import { useState, useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import TopBarProgress from "react-topbar-progress-indicator";
import Pagination from "../components/Pagination";
import CreateCardList from "../components/CardPokemon/Index";
import Header from "../components/Header/Index";

const getPokeURL = (id) =>
  process.env.REACT_APP_API_URL + id ||
  `https://pokeapi.co/api/v2/pokemon/` + id;

TopBarProgress.config({
  barColors: {
    0: "#FFFF00",
  },
  shadowBlur: 5,
});

function Home() {
  const maxPoke = 898;
  const itemsPerPage = 40;

  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonList, setPokemonList] = useState(undefined);
  const [selectedPage, setSelectedPage] = useState(1);

  const paginateItems = Math.ceil(maxPoke / itemsPerPage);
  const pageMaxItems = itemsPerPage * (selectedPage - 1) + itemsPerPage;
  const maxPokeValue = pageMaxItems > maxPoke ? maxPoke : pageMaxItems;

  //Search
  const [searchData, setSearchData] = useState(null);
  const [searchItem, setSearchItem] = useState(undefined);

  const SelectPage = (page) => {
    if (page <= paginateItems && page >= 1 && page !== selectedPage) {
      setLoadingItems(true);
      setSelectedPage(page);
      setPokemonList(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898")
      .then((response) => response.json())
      .then((data) => setSearchData(data.results));
  }, []);
  

  useEffect(() => {
    var pokemonPromisses = [];
    for (
      let i = itemsPerPage * (selectedPage - 1) + 1;
      i <= maxPokeValue;
      i++
    ) {
      pokemonPromisses.push(
        fetch(getPokeURL(i)).then((response) => response.json())
      );
    }
    Promise.all(pokemonPromisses).then((pokemons) => {
      setPokemonList(pokemons);
      setLoadingItems(false);
    });
  }, [selectedPage]); // eslint-disable-line


  return (
    <div className="App">
      {loadingItems && <TopBarProgress />}
      <Header setSearch={setSearchItem} searchData={searchData}/>
      
      {!searchItem && <Pagination
        paginateSize={5}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />}

      {searchItem ? 
        <CreateCardList pkList={searchItem} loadingDone={loadingItems} search={true}/>
        :
        <CreateCardList pkList={pokemonList} loadingDone={loadingItems}/>   
      }
      

      {!searchItem && <Pagination
        paginateSize={5}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />}

      <footer></footer>
    </div>
  );
}

export default Home;
