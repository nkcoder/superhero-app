import { useState } from "react";
import "./superhero.css";
import { API, graphqlOperation } from "aws-amplify";
import { savedSuperhero } from "../../graphql/mutations.js";

const SuperHero = ({ superhero, username }) => {
  console.log(`SuperHero: superhero=${JSON.stringify(superhero)}, username=${username}`);

  const [isEdit, setIsEdit] = useState(false);
  const [currentHero, setCurrentHero] = useState({});

  const handleEdit = () => {
    setIsEdit(true);
    setCurrentHero(superhero);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setCurrentHero({});
  };

  const handleSave = async () => {
    const updateSuperHeroReq = {
      id: currentHero.id,
      name: currentHero.name,
      image: {
        url: currentHero.image.url,
      },
      powerstats: {
        combat: currentHero.powerstats.combat,
        durability: currentHero.powerstats.durability,
        intelligence: currentHero.powerstats.intelligence,
        power: currentHero.powerstats.power,
        speed: currentHero.powerstats.speed,
        strength: currentHero.powerstats.strength,
      },
    };
    try {
      console.log(`start to save your super hero: ${JSON.stringify(updateSuperHeroReq)}`);
      const saved = await API.graphql(
        graphqlOperation(savedSuperhero, {
          username: username,
          updateSuperHeroReq: updateSuperHeroReq,
        })
      );
      console.log(`Super hero is saved: ${saved}.`);
      setIsEdit(false);
    } catch (err) {
      console.error("error saving your super heros", err);
    }
  };

  const handleStatChange = updatedPowerstats => {
    console.log(`handleStatChange: ${JSON.stringify(updatedPowerstats)}`);
    setCurrentHero({ ...superhero, powerstats: { ...updatedPowerstats } });
  };

  const isCurrentHero = currentHero && superhero.id === currentHero.id;

  return (
    <li className="superhero">
      <img src={superhero.image.url} alt="SuperHero" />
      <div className="superhero-detail">
        <h3>{superhero.name}</h3>
        <PowerStats
          isEdit={isEdit}
          powerstats={isCurrentHero ? currentHero.powerstats : superhero.powerstats}
          onStatChange={handleStatChange}
        />
        <Action isEdit={isEdit} handleCancel={handleCancel} handleSave={handleSave} handleEdit={handleEdit} />
      </div>
    </li>
  );
};

const Action = ({ isEdit, handleEdit, handleCancel, handleSave }) => {
  if (isEdit) {
    return (
      <div className="btn">
        <button className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
      </div>
    );
  } else {
    return (
      <button className="btn-edit" onClick={handleEdit}>
        Edit
      </button>
    );
  }
};

const PowerStats = ({ isEdit, powerstats, onStatChange }) => {
  return (
    <div className="powerstats">
      <div>
        <label>combat: </label>
        <input
          type="text"
          value={powerstats.combat}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, combat: event.target.value })}
        />
      </div>

      <div>
        <label>durability:</label>
        <input
          type="text"
          value={powerstats.durability}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, durability: event.target.value })}
        />
      </div>

      <div>
        <label>intelligence</label>
        <input
          type="text"
          value={powerstats.intelligence}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, intelligence: event.target.value })}
        />
      </div>

      <div>
        <label>power</label>
        <input
          type="text"
          value={powerstats.power}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, power: event.target.value })}
        />
      </div>

      <div>
        <label>speed</label>
        <input
          type="text"
          value={powerstats.speed}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, speed: event.target.value })}
        />
      </div>

      <div>
        <label>strength</label>
        <input
          type="text"
          value={powerstats.strength}
          disabled={!isEdit}
          onChange={event => onStatChange({ ...powerstats, strength: event.target.value })}
        />
      </div>
    </div>
  );
};

export default SuperHero;
