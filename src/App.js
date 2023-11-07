import "./App.css";
import { useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { searchSuperheroes } from "./graphql/queries.js";

import awsExports from "./aws-exports.js";
Amplify.configure(awsExports);

function App() {
  console.log("at the beginning of App");

  const [searchKey, setSearchKey] = useState("");
  const [superHeros, setSuperHeros] = useState([]);

  const searchSuperHeros = async () => {
    console.log(`start to search super heros by :${searchKey}`);
    try {
      const searchResult = await API.graphql(graphqlOperation(searchSuperheroes, { name: searchKey }));
      console.log(`search by ${searchKey}, result is ${JSON.stringify(searchResult)}`);
      setSuperHeros(searchResult.data.searchSuperheroes);
    } catch (err) {
      console.log("error searching super heros", err);
    }
  };

  return (
    <div className="main">
      <Header />
      <Search searchKey={searchKey} searchSuperHeros={searchSuperHeros} updateSearchKey={setSearchKey} />
      <SuperHeros superheros={superHeros} />
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>Super Heros</h1>
    </header>
  );
};

const Search = ({ searchKey, searchSuperHeros, updateSearchKey }) => {
  return (
    <div className="search">
      <input
        value={searchKey}
        type="text"
        placeholder="Search super heros"
        minLength="2"
        maxLength="30"
        onChange={event => updateSearchKey(event.target.value)}
      />
      <button onClick={searchSuperHeros}>Search</button>
    </div>
  );
};

const SuperHeros = ({ superheros }) => {
  if (superheros.length === 0) {
    return <p>No super heros found, please try something else.</p>;
  }

  const superHeros = superheros.map(hero => <SuperHero key={hero.id} superhero={hero} />);

  return <ul className="superheros">{superHeros}</ul>;
};

const SuperHero = ({ superhero }) => {
  return (
    <li className="superhero">
      <img src={superhero.image.url} alt="SuperHero" />
      <div>
        <h3>{superhero.name}</h3>
        <div className="powerstats">
          <span>combat: {superhero.powerstats.combat}</span>
          <span>durability: {superhero.powerstats.durability}</span>
          <span>intelligence: {superhero.powerstats.intelligence}</span>
          <span>power: {superhero.powerstats.power}</span>
          <span>speed: {superhero.powerstats.speed}</span>
          <span>strength: {superhero.powerstats.strength}</span>
        </div>
      </div>
    </li>
  );
};

export default App;
