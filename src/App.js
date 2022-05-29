import "./App.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useState, useEffect } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import Pagination from "./components/pagination/Pagination";
import ContentPokeList from "./components/CardPokemon/Card";
import Header from './components/header/Header'
// import JsonPokemonData from './data.json'
const getPokeURL = (id) =>
  process.env.REACT_APP_API_URL + id ||
  `https://pokeapi.co/api/v2/pokemon/` + id;

TopBarProgress.config({
  barColors: {
    0: "#f00",
    0.5: "#0f0",
    "1.0": "#00f",
  },
  shadowBlur: 0,
});

function App() {
  const maxPoke = 898;
  const itemsPerPage = 40;

  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonList, setPokemonList] = useState(undefined);
  const [selectedPage, setSelectedPage] = useState(1);
  const paginateItems = Math.ceil(maxPoke / itemsPerPage);
  const pageMaxItems = itemsPerPage * (selectedPage - 1) + itemsPerPage;
  const maxPokeValue = pageMaxItems > maxPoke ? maxPoke : pageMaxItems;

  const SelectPage = (page) => {
    if (page <= paginateItems && page >= 1 && page !== selectedPage) {
      setLoadingItems(true);
      setSelectedPage(page);
      setPokemonList(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      <Header />

      <Pagination
        paginateSize={5}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />

      <ContentPokeList
        pkList={pokemonList}
        loadingDone={loadingItems}
      />

      <Pagination
        paginateSize={5}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />

      <footer></footer>
    </div>
  );
}


export default App;
