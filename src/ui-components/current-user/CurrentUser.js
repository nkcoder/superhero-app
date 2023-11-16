import { useUserName } from "../ContextProvider.js";
import "./currentUser.css";
import { API, graphqlOperation } from "aws-amplify";
import { getSavedSuperheroes } from "../../graphql/queries.js";

export const CurrentUser = ({ signOut, handleMySuperHeroes }) => {
  const username = useUserName();

  const handleGetMySuperHeroes = async () => {
    try {
      const mySuperHeroes = await API.graphql(graphqlOperation(getSavedSuperheroes, { username: username }));
      console.log(`get super heros of ${username}, result is ${JSON.stringify(mySuperHeroes)}`);
      handleMySuperHeroes(mySuperHeroes.data.getSavedSuperheroes);
    } catch (err) {
      console.log("error getting my super heroes", err);
    }
    return false;
  };

  return (
    <section className="user-info">
      <section className="dropdown">
        <button className="dropdown-button">{username} &#8595;</button>
        <div className="dropdown-content">
          <button onClick={handleGetMySuperHeroes}>My Super Heroes</button>
        </div>
      </section>
      <button className="signout" onClick={signOut}>
        Sign out
      </button>
    </section>
  );
};
