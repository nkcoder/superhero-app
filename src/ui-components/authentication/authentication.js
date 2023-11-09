import "./authentication.css";

export const Authentication = (user, signOut) => {
  return (
    <div className="authentication">
      <p>{user.username}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};
