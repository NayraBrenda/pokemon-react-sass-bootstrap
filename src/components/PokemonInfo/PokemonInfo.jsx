import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PokemonInfo.module.sass";

const PokemonInfo = ({ pokemon }) => {
  const [move, setMove] = useState();
  const [moveDetails, setMoveDetails] = useState();

  const img = pokemon?.sprites?.other?.dream_world?.front_default;
  const abilities = pokemon?.abilities;
  const moves = pokemon?.moves;

  useEffect(() => {
    move &&
      axios.get(move).then((resp) => {
        setMoveDetails(resp.data);
      });
  }, [move]);

  return (
    <>
      <img src={img} className={styles.PokemonImage} />
      {pokemon && <h1 className={styles.PokemonName}>{pokemon?.name}</h1>}
      <div>
        {pokemon && <h2 className={styles.AbilitiesTitle}>Habilidades:</h2>}
        {abilities?.map((item) => {
          return (
            <div className={styles.Abilities} key={item.ability.name}>
              {item?.ability.name}
            </div>
          );
        })}
      </div>

      {pokemon && (
        <select
          className={styles.MovesSelect}
          value={move}
          onChange={(e) => setMove(e.target.value)}
        >
          <option className={styles.MovesOption} value="">
            Movimentos:
          </option>
          {moves?.map((item) => {
            return (
              <option
                className={styles.MovesOption}
                value={item?.move.url}
                key={item?.move.url}
              >
                {item?.move?.name}
              </option>
            );
          })}
        </select>
      )}

      <div className={styles.MovesDetails}>
        {moveDetails && (
          <div className="move-details">
            precisão: {moveDetails?.accuracy || "X"}, força:{" "}
            {moveDetails?.power || "X"}
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonInfo;
