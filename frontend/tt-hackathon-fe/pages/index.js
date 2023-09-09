import Head from "next/head";
import { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import { UserContext } from "./_app";
import LoginFormNew from "../components/LoginFormNew";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onLoginSuccess = (user) => {
    closeModal();
    setUser(user);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce</title>
        <link rel="icon" href="../public/tiktok_icon.png" />
      </Head>
      <Navbar isLoggedIn={user} loginOnClick={openModal}></Navbar>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* <LoginForm _callback={onLoginSuccess}></LoginForm> */}
        <LoginFormNew></LoginFormNew>
      </Modal>

      <main>
        <Sidebar user={user}></Sidebar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "inherit",
          }}>
          <h1>{user.userType ? `LANDING PAGE; TYPE: ${user.userType}` : "PRE-LOGIN CONTENT"}</h1>
        </div>
      </main>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
