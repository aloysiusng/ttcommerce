import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

export { UserContext };

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
