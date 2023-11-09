import "./authentication.css";

export const Authentication = ({ username, signOut }) => {
  return (
    <div className="authentication">
      <p>Hello, {username}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};
