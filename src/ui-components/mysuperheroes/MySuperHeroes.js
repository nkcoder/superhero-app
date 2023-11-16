import { API, graphqlOperation } from "aws-amplify";
import { getSavedSuperheroes } from "../../graphql/queries.js";
import "./MySuperHeroes.css";
import { useUserName } from "../ContextProvider.js";

const MySuperHeroes = ({ handleMySuperHeroes }) => {
  const username = useUserName();
  const handleOnClick = async () => {
    try {
      const mySuperHeroes = await API.graphql(graphqlOperation(getSavedSuperheroes, { username: username }));
      console.log(`get super heros of ${username}, result is ${JSON.stringify(mySuperHeroes)}`);
      handleMySuperHeroes(mySuperHeroes.data.getSavedSuperheroes);
    } catch (err) {
      console.log("error getting my super heroes", err);
    }
  };

  return (
    <section className="my-heroes">
      <button onClick={handleOnClick}>My Super Heroes</button>
    </section>
  );
};

export default MySuperHeroes;
