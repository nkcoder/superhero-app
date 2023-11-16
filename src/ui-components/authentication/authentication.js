import { useUserName } from "../ContextProvider.js";
import "./authentication.css";

export const Authentication = ({ signOut }) => {
  const username = useUserName();
  return (
    <section className="authentication">
      <p>Hello, {username}</p>
      <button onClick={signOut}>Sign out</button>
    </section>
  );
};
