import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import { UserContext } from "./_app";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [isTter, setIsTter] = useState(false);
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
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user} loginOnClick={openModal}></Navbar>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginForm _callback={onLoginSuccess}></LoginForm>
      </Modal>

      <main>
        <Sidebar user={user}></Sidebar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "inherit",
          }}
        >
          <h1>
            {user.userType
              ? `Landing page of ${user.userType}`
              : "PRE-LOGIN CONTENT"}
          </h1>
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
