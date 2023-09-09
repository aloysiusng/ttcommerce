import "bootstrap-icons/font/bootstrap-icons.css";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";


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
    <>
      <ToastContainer />
      <SessionProvider session={pageProps.session}>
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </SessionProvider>
    </>
  );
}
