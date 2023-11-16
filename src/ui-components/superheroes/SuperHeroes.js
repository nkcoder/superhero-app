import "./SuperHeroes.css";
import SuperHero from "../superhero/superhero.js";
import { useUserName } from "../ContextProvider.js";

const SuperHeroes = ({ superheros }) => {
  const username = useUserName();
  console.log(`SuperHeroes: ${JSON.stringify(superheros)}, username: ${username}`);
  if (superheros.length === 0) {
    return <h3>Give a keyword, and get your super heroes!</h3>;
  }

  const superHeros = superheros.map(hero => <SuperHero key={hero.id} superhero={hero} username={username} />);
  return <ul className="superheros">{superHeros}</ul>;
};

export default SuperHeroes;
