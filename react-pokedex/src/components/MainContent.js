import React from "react";
import Search from "./Search";
import { useState, useEffect } from "react";

function MainContent() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [nextPrev, setNextPrev] = useState(25);

  useEffect(() => {
    FetchPokemon(25);
  }, []);

  useEffect(() => {
    FetchPokemon(nextPrev);
    setSearch("");
  }, [nextPrev]);

  const HandleSearch = (e) => {
    e.preventDefault();
    FetchPokemon(search.toLowerCase());
  };

  const FetchPokemon = async (query) => {
    const temp = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then(
      (res) => res.json()
    );

    setPokemon(temp);
    setNextPrev(temp.id);
  };

  if (pokemon) {
    return (
      <>
        <main>
          <img
            src={
              pokemon["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
              ]["front_default"]
            }
            className="pokemon_image"
          ></img>

          <h1 className="pokemon_data">
            <span className="pokemmon_number">{pokemon.id}</span> -
            <span className="pokemon_name">{pokemon.name}</span>
          </h1>

          <Search
            HandleSearch={HandleSearch}
            search={search}
            pokemon={pokemon}
            setSearch={setSearch}
          />

          <div className="buttons">
            <button
              className="button btn-prev"
              onClick={() => {
                if (nextPrev - 1 > 0) {
                  setNextPrev(nextPrev - 1);
                }
              }}
            >
              Prev &#60;
            </button>
            <button
              className="button btn-next"
              onClick={() => {
                if (nextPrev < 1008) {
                    setNextPrev(nextPrev + 1);
                  }       
              }}
            >
              Next &#62;
            </button>
          </div>

          <img
            src="https://raw.githubusercontent.com/manualdodev/pokedex/main/images/pokedex.png"
            className="pokedex"
          ></img>
        </main>
      </>
    );
  }

  return <h1>Loading...</h1>;
}

export default MainContent;
