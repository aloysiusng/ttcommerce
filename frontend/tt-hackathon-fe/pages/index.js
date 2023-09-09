import { Box } from "@mui/material";
import Head from "next/head";
import { useContext, useState } from "react";
import IndexPage from "../components/IndexPage";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "./_app";

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
    <Box >
      <Head>
        <title>TikTok Commerce</title>
        <link rel="icon" src="tiktok_icon.png" />
      </Head>
      <Navbar isLoggedIn={user} loginOnClick={openModal}></Navbar>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginForm _callback={onLoginSuccess}></LoginForm>
      </Modal>

      <main style={{ display: "flex", width: "100%", overflow:"hidden" }}>
        <Sidebar user={user}></Sidebar>
        {user.userType ? `LANDING PAGE; TYPE: ${user.userType}` : <IndexPage></IndexPage>}
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
    </Box>
  );
}
