import "./authentication.css";

export const Authentication = ({ username, signOut }) => {
  return (
    <section className="authentication">
      <p>Hello, {username}</p>
      <button onClick={signOut}>Sign out</button>
    </section>
  );
};
