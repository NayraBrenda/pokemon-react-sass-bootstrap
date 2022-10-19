import { useState, useEffect } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import axios from "axios";

import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo";
import Pagination from "./components/Pagination/Pagination";

import PokemonLogo from "./images/pokemon-logo.png";
import styles from "./App.module.sass";

const App = () => {
  const [pokemon, setPokemon] = useState({});
  const [pokemonInfo, setPokemonInfo] = useState();

  const url = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    axios.get(url).then((resp) => {
      setPokemon(resp.data);
    });
  }, []);

  const clickPokemon = (pokemonDetails) => {
    setPokemonInfo(pokemonDetails);
  };

  const clickPage = (url) => {
    axios.get(url).then((resp) => {
      setPokemon(resp.data);
    });
  };

  return (
    <>
      <Navbar className={styles.NavbarApp}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={PokemonLogo}
              width="50"
              height="50"
              className={styles.Logo}
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className={styles.ContainerApp}>
        <Row>
          <Col md={9}>
            <Container className={styles.TitleAppContainer}>
              <h1 className={styles.TitleApp}>
                Clique no Pokemon e veja detalhes
              </h1>
            </Container>
            <Container>
              <Row>
                {pokemon?.results?.map((item) => {
                  return (
                    <PokemonCard
                      pokemon={item}
                      key={item.name}
                      handleClick={clickPokemon}
                    />
                  );
                })}
              </Row>
            </Container>
            {pokemon && (
              <Pagination
                next={pokemon.next}
                previous={pokemon.previous}
                clickPage={clickPage}
              />
            )}
          </Col>

          <Col md={3} className={styles.DetailsContainer}>
            <div className={styles.Details}>
              <PokemonInfo pokemon={pokemonInfo} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
