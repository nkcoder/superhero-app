import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import SuperHeroes from "./ui-components/superheroes/SuperHeroes.js";
import Search from "./ui-components/search/Search.js";

import awsExports from "./aws-exports.js";
import { Authentication } from "./ui-components/authentication/authentication.js";
import MySuperHeroes from "./ui-components/mysuperheroes/MySuperHeroes.js";
import { UserNameContextProvider } from "./ui-components/ContextProvider.js";
Amplify.configure(awsExports);

function App({ user, signOut }) {
  const { username } = user;
  console.log(`Current user: ${username}`);

  const [superHeros, setSuperHeros] = useState([]);

  const handleSearch = superheroes => {
    setSuperHeros(superheroes);
  };

  const handleMySuperHeroes = mySuperHeroes => {
    setSuperHeros(mySuperHeroes);
  };

  return (
    <>
      <UserNameContextProvider username={username}>
        <Authentication signOut={signOut} />
        <MySuperHeroes handleMySuperHeroes={handleMySuperHeroes} />
        <div className="main">
          <Header />
          <Search handleSearch={handleSearch} />
          <SuperHeroes superheros={superHeros} />
        </div>
      </UserNameContextProvider>
    </>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>Super Heros</h1>
    </header>
  );
};

export default withAuthenticator(App);
