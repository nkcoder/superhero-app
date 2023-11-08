import "./App.css";
import { useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { searchSuperheroes } from "./graphql/queries.js";
import { savedSuperhero } from "./graphql/mutations.js";

import awsExports from "./aws-exports.js";
Amplify.configure(awsExports);

function App() {
  console.log("at the beginning of App");

  const [searchKey, setSearchKey] = useState("");
  const [superHeros, setSuperHeros] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedHero, setSelectedHero] = useState({});

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

  const saveSuperHeros = async () => {
    console.log(`start to save your super hero: ${JSON.stringify(selectedHero)}`);
    const updateSuperHeroReq = {
      id: selectedHero.id,
      name: selectedHero.name,
      image: {
        url: selectedHero.image.url,
      },
      powerstats: {
        combat: selectedHero.powerstats.combat,
        durability: selectedHero.powerstats.durability,
        intelligence: selectedHero.powerstats.intelligence,
        power: selectedHero.powerstats.power,
        speed: selectedHero.powerstats.speed,
        strength: selectedHero.powerstats.strength,
      },
    };
    try {
      console.log(`start to save your super hero: ${JSON.stringify(updateSuperHeroReq)}`);
      await API.graphql(
        graphqlOperation(savedSuperhero, {
          userId: 1,
          updateSuperHeroReq: updateSuperHeroReq,
        })
      );
    } catch (err) {
      console.log("error saving your super heros", err);
    }
  };

  const toggleEditMode = superHero => {
    setSelectedHero(superHero);
    console.log(`editMode: ${editMode}`);

    if (editMode) {
      saveSuperHeros(selectedHero);
    }

    setEditMode(!editMode);
  };

  const Search = ({ searchKey, searchSuperHeros }) => {
    return (
      <div className="search">
        <input
          value={searchKey}
          type="text"
          placeholder="Search super heros"
          minLength="2"
          maxLength="30"
          onChange={event => setSearchKey(event.target.value)}
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

  const updatePowerStat = updatedData => {
    setSelectedHero({
      ...selectedHero,
      ...updatedData,
    });
  };

  const SuperHero = ({ superhero }) => {
    return (
      <li className="superhero">
        <img src={superhero.image.url} alt="SuperHero" />
        <div>
          <h3>{superhero.name}</h3>
          {!editMode ? (
            <ShowPowerStats powerstats={superhero.powerstats} />
          ) : (
            <EditPowerStats powerstats={selectedHero.powerstats} updatePowerStat={updatePowerStat} />
          )}
          <button onClick={e => toggleEditMode(superhero)}>{editMode ? "Save" : "Edit"}</button>
        </div>
      </li>
    );
  };

  const ShowPowerStats = ({ powerstats }) => {
    return (
      <div className="powerstats">
        <li>combat: {powerstats.combat}</li>
        <li>durability: {powerstats.durability}</li>
        <li>intelligence: {powerstats.intelligence}</li>
        <li>power: {powerstats.power}</li>
        <li>speed: {powerstats.speed}</li>
        <li>strength: {powerstats.strength}</li>
      </div>
    );
  };

  const EditPowerStats = ({ powerstats, updatePowerStat }) => {
    return (
      <div className="powerstats">
        <span>
          combat:{" "}
          <input
            type="text"
            value={powerstats.combat}
            onChange={event => updatePowerStat({ combat: event.target.value })}
          />
        </span>
        <span>
          durability:{" "}
          <input
            type="text"
            value={powerstats.durability}
            onChange={event => updatePowerStat({ durability: event.target.value })}
          />
        </span>
        <span>
          intelligence:{" "}
          <input
            type="text"
            value={powerstats.intelligence}
            onChange={event => updatePowerStat({ intelligence: event.target.value })}
          />
        </span>
        <span>
          power:{" "}
          <input
            type="text"
            value={powerstats.power}
            onChange={event => updatePowerStat({ power: event.target.value })}
          />
        </span>
        <span>
          speed:{" "}
          <input
            type="text"
            value={powerstats.speed}
            onChange={event => updatePowerStat({ speed: event.target.value })}
          />
        </span>
        <span>
          strength:{" "}
          <input
            type="text"
            value={powerstats.strength}
            onChange={event => updatePowerStat({ strength: event.target.value })}
          />
        </span>
      </div>
    );
  };

  return (
    <div className="main">
      <Header />
      <Search searchKey={searchKey} searchSuperHeros={searchSuperHeros} />
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

export default App;
