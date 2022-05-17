import './App.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


import { useState, useEffect } from 'react';


const getPokeURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`


function App() {
  const pokemonPromisses = []
  const [pokemonList, setPokemonList] = useState(undefined)
  const [selectedPage, setSelectedPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  useEffect(() => {
    for (let i = (itemsPerPage * (selectedPage - 1)) + 1; i <= (itemsPerPage * (selectedPage - 1)) + itemsPerPage; i++) {
      pokemonPromisses.push(fetch(getPokeURL(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromisses)
      .then(pokemons => {
        setPokemonList(pokemons)
      })
  }, [selectedPage])

  return (
    <div className="App">

      <header className='search'>

        <img src='./pokemon.svg' alt=''></img>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => { setSelectedPage(selectedPage - 1) }}>&#x3c;</button>
          <div>{selectedPage}</div>
          <button onClick={() => { setSelectedPage(selectedPage + 1) }}>&#x3e;</button>
        </div>
        <div>
          <input></input>
          <button>Pesquisar</button>
        </div>
      </header>
      {/* <Pagination /> */}
      <RenderSelectedPage pkList={pokemonList} />



    </div>
  );
}

function RenderSelectedPage({ pkList }) {
  return (
    <ul className='poketable'>
      {!pkList ?
        <div>Carregando...</div> :
        pkList.map((data, index) => (
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
              {/* <img alt='' src={data.sprites.other['official-artwork'].front_default}></img> */}


            </div>
            <div className='typeList'>
              <PokeTypes pokeTypes={data} />
            </div>
          </div>
        )
        )
      }
    </ul>
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
