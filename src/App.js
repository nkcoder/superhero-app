import "./App.css";
import { useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { searchSuperheroes, getSavedSuperheroes } from "./graphql/queries.js";
import { savedSuperhero } from "./graphql/mutations.js";

import awsExports from "./aws-exports.js";
Amplify.configure(awsExports);

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [superHeros, setSuperHeros] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedHero, setSelectedHero] = useState({});
  const [mySavedSuperHeros, setMySavedSuperHeros] = useState([]);

  const searchSuperHeros = async () => {
    console.log(`start to search super heros by :${searchKey}`);
    if (!searchKey || searchKey.length === 0) {
      console.log("no search key provided.");
      setSuperHeros([]);
      setEditMode(false);
      return;
    }

    try {
      const searchResult = await API.graphql(graphqlOperation(searchSuperheroes, { name: searchKey }));
      console.log(`search by ${searchKey}, result is ${JSON.stringify(searchResult)}`);
      setSuperHeros(searchResult.data.searchSuperheroes);
      setEditMode(false);
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

  const getMySuperHeros = async () => {
    const userId = 1;
    try {
      const mySuperHeroes = await API.graphql(graphqlOperation(getSavedSuperheroes, { userId: userId }));
      console.log(`get super heros of ${userId}, result is ${JSON.stringify(mySuperHeroes)}`);
      setMySavedSuperHeros(mySuperHeroes.data.getSavedSuperheroes);
      setSuperHeros(mySavedSuperHeros);
      setEditMode(false);
    } catch (err) {
      console.log("error getting my super heroes", err);
    }
  };

  const Search = ({ searchSuperHeros }) => {
    console.log(`Search is rendering`);
    return (
      <div className="search">
        <input value={searchKey} onChange={e => setSearchKey(e.target.value)} />
        <button type="button" onClick={() => searchSuperHeros(searchKey)}>
          Search
        </button>
        <button type="button" onClick={getMySuperHeros}>
          Get my super heros
        </button>
      </div>
    );
  };

  const SuperHeros = ({ superheros }) => {
    if (superheros.length === 0) {
      return <h3>No super heros found, please try something else.</h3>;
    }

    const superHeros = superheros.map(hero => <SuperHero key={hero.id} superhero={hero} />);

    return <ul className="superheros">{superHeros}</ul>;
  };

  const updatePowerStat = updatedData => {
    console.log(`select hero before: ${JSON.stringify(selectedHero)}`);
    setSelectedHero({
      ...selectedHero,
      powerstats: {
        ...selectedHero.powerstats,
        ...updatedData,
      },
    });
    const selectedHeroAfter = {
      ...selectedHero,
      powerstats: {
        ...selectedHero.powerstats,
        ...updatedData,
      },
    };
    console.log(`selected hero after: ${JSON.stringify(selectedHeroAfter)}`);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedHero({});
  };

  const handleSave = superHero => {
    setSelectedHero(superHero);
    console.log(`editMode: ${editMode}`);

    saveSuperHeros(selectedHero);

    setEditMode(false);
  };

  const handleEdit = superHero => {
    setSelectedHero(superHero);
    setEditMode(true);
  };

  const SuperHero = ({ superhero }) => {
    const powerstats = selectedHero.id === superhero.id ? selectedHero.powerstats : superhero.powerstats;
    return (
      <li className="superhero">
        <img src={superhero.image.url} alt="SuperHero" />
        <div>
          <h3>{superhero.name}</h3>
          {editMode ? (
            <EditPowerStats powerstats={powerstats} updatePowerStat={updatePowerStat} />
          ) : (
            <ShowPowerStats powerstats={powerstats} />
          )}
          <Button className="btn" superHero={superhero} />
        </div>
      </li>
    );
  };

  const Button = ({ superHero }) => {
    if (editMode) {
      return (
        <>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={e => handleSave(selectedHero)}>
            Save
          </button>
        </>
      );
    } else {
      const savedHeroIds = mySavedSuperHeros.map(hero => hero.id);
      const alreadySaved = savedHeroIds.includes(superHero.id);
      return (
        <>
          {alreadySaved && !superHero.userId ? (
            <button className="saved">Saved</button>
          ) : (
            <button className="nonsaved" onClick={e => handleEdit(superHero)}>
              Edit
            </button>
          )}
        </>
      );
    }
  };

  const ShowPowerStats = ({ powerstats }) => {
    return (
      <div className="powerstats">
        <span>combat: {powerstats.combat}</span>
        <span>durability: {powerstats.durability}</span>
        <span>intelligence: {powerstats.intelligence}</span>
        <span>power: {powerstats.power}</span>
        <span>speed: {powerstats.speed}</span>
        <span>strength: {powerstats.strength}</span>
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
