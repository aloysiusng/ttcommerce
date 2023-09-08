import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, createContext } from "react";

const UserContext = createContext();

export { UserContext };

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
