import './App.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useState, useEffect } from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import Pagination from './components/Pagination';
import ContentPokeList from './components/ContentPokeList'

// import JsonPokemonData from './data.json'
const getPokeURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

TopBarProgress.config({
  barColors: {
    "0": "#f00",
    "0.5": "#0f0",
    "1.0": "#00f",
  },
  shadowBlur: 0
});


let shows = `{
  "netflix": {
      "name": "Stranger Things",
      "creator": "Duffer Brothers",
      "year": 2016,
      "characters": ["Eleven", "Mike", "Dustin"],
      "genre": "Science Fiction/Horror",
      "price": {
          "1 person": "$5", "2 person": "$8", "4 person": "$13"
      }
  }
}`;

function App() {
  const maxPoke = 898;
  const itemsPerPage = 40

  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonList, setPokemonList] = useState(undefined)
  const [selectedPage, setSelectedPage] = useState(1)
  const paginateItems = Math.ceil(maxPoke / itemsPerPage);
  const pageMaxItems = (itemsPerPage * (selectedPage - 1)) + itemsPerPage;
  const maxPokeValue = pageMaxItems > maxPoke ? maxPoke : pageMaxItems;
 
 
  useEffect(() => {
    const pokemonPromisses = [];
    for (let i = (itemsPerPage * (selectedPage - 1)) + 1; i <= maxPokeValue; i++) {
      pokemonPromisses.push(
        fetch(
          getPokeURL(i))
          .then(response => response.json()
          )
      )
    }

    Promise.all(pokemonPromisses)
      .then(pokemons => {
        setPokemonList(pokemons)
        setLoadingItems(false)
      })
    }, [selectedPage])
    
  const SelectPage = (page) => {
    if (page <= paginateItems && page >= 1 && page != selectedPage) {
      setLoadingItems(true)
      setSelectedPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
 
  return (
    <div className="App">
      {loadingItems && <TopBarProgress />}
      <header className='search'>
        <img src='./pokemon.svg' alt=''></img>
      </header>

      <Pagination
        paginateSize={9}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />

      <ContentPokeList
        pkList={pokemonList}
        loadingDone={loadingItems}
      />

      <Pagination
        paginateSize={9}
        selectedPage={selectedPage}
        SelectPage={SelectPage}
        paginateItems={paginateItems}
      />
      <footer></footer>
    </div>
  );
}


export default App;
