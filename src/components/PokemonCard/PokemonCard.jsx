import axios from "axios";
import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import styles from "./Pokemons.module.sass";
import ReactLoading from "react-loading";

function PokemonCard({ pokemon, handleClick }) {
  const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    axios.get(pokemon?.url).then((resp) => {
      setPokemonDetails(resp.data);
    });
  }, []);

  const image = pokemonDetails?.sprites ? (
    <div className={styles.PokemonImage}>
      <img src={pokemonDetails?.sprites.front_default} />
    </div>
  ) : (
    <ReactLoading type="spin" color="#ccc" height={100} width={100} />
  );

  return (
    <Col
      onClick={() => handleClick(pokemonDetails)}
      className={styles.PokemonContainer}
      sm={12}
      md={6}
      lg={4}
      xl={3}
    >
      <div className={styles.PokemonProfile}>
        <div className={styles.PokemonImageBox}>{image}</div>
        <div className={styles.PokemonName}>
          <h4>{pokemon.name}</h4>
        </div>
      </div>
    </Col>
  );
}

export default PokemonCard;
