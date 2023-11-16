import { createContext, useContext } from "react";

const UserNameContext = createContext("");

const useUserName = () => useContext(UserNameContext);

const UserNameContextProvider = ({ username, children }) => {
  return <UserNameContext.Provider value={username}>{children}</UserNameContext.Provider>;
};

export { UserNameContextProvider, useUserName };
