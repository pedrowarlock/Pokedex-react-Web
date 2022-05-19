import './App.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import TopBarProgress from "react-topbar-progress-indicator";

import { useState, useEffect } from 'react';


const getPokeURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const maxPoke = 898;

TopBarProgress.config({
  barColors: {
    "0": "#f00",
    "0.5": "#0f0",
    "1.0": "#00f",
  },
  shadowBlur: 0
});


function App() {
  var pokemonPromisses = [];

  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonList, setPokemonList] = useState(undefined)
  const [selectedPage, setSelectedPage] = useState(1)
  const itemsPerPage = 40
  const paginateItems = Math.ceil(maxPoke / itemsPerPage);

  const pageMaxItems = (itemsPerPage * (selectedPage - 1)) + itemsPerPage;
  const maxPokeValue = pageMaxItems > maxPoke ? maxPoke : pageMaxItems;


  useEffect(() => {
    for (let i = (itemsPerPage * (selectedPage - 1)) + 1; i <= maxPokeValue; i++) {
      pokemonPromisses.push(fetch(getPokeURL(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromisses)
      .then(pokemons => {
        setPokemonList(pokemons)
        setLoadingItems(false)
      })
  }, [selectedPage])

  const SelectPage = (page) => {
    if (page <= paginateItems && page >= 1) {
      setLoadingItems(true)
      setSelectedPage(page);
    }
  }
  return (
    <div className="App">
       {loadingItems && <TopBarProgress />}
      <header className='search'>
        <img src='./pokemon.svg' alt=''></img>
        <Pagination
          paginateSize={9}
          selectedPage={selectedPage}
          SelectPage={SelectPage}
          paginateItems={paginateItems}
        />
      </header>

      <RenderSelectedPage pkList={pokemonList} loadingDone={loadingItems} />
    </div>
  );
}

function Pagination({ paginateSize, selectedPage, SelectPage, paginateItems }) {
  var tmp = [], leftRange;

  if (selectedPage < Math.ceil(paginateSize / 2)) {
    leftRange = 1;
  } else if (selectedPage >= paginateItems - Math.floor(paginateSize / 2)) {
    leftRange = paginateItems - paginateSize + 1;
  } else {
    leftRange = selectedPage - Math.ceil(paginateSize / 2) + 1;
  }

  for (var i = leftRange; i < (leftRange + paginateSize); i++) {
    tmp.push(i);
  }

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
      <div className='pg_button' onClick={() => {
        SelectPage(selectedPage - 1);
      }}>🡸
      </div>

      {
        tmp.map((item, index) => (
          <div
            className={`paginationItem ${(selectedPage === (item)) ? 'paginationItemActive' : ''}`}
            key={index} style={{ cursor: 'pointer' }}
            onClick={() => SelectPage(item)}>
            {item}
          </div>
        ))
      }


      <div className='pg_button' onClick={() => {
        SelectPage(selectedPage + 1);
      }}>🡺
      </div>
    </div>
  )
}

function RenderSelectedPage({ pkList }) {
  return (
    <div className='poketable'>
      {pkList && pkList.map((data, index) => (
        <div className='item' key={data.id}>
          <div className='pokeID'>{data.id}</div>
          <div className='pokeName'>{data.name}</div>
          <div className='pokeIMG'>
            <LazyLoadImage
              alt={data.name}
              height={140}
              width={140}
              effect="blur"
              src={data.sprites.other['official-artwork'].front_default}
            />
          </div>
          <div className='typeList'>
            <PokeTypes pokeTypes={data} />
          </div>
        </div>
      )
      )
      }
    </div>
  )
}


function PokeTypes({ pokeTypes }) {
  return (
    <>
      {
        pokeTypes.types.map((typeInfo, index) => (
          <span key={index} className={`typeItems type_${typeInfo.type.name}`}>{typeInfo.type.name}</span>
        )
        )
      }

    </>
  )
}



export default App;
