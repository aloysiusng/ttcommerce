import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import { useContext, useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import TailwindSpec from "../components/TailwindSpec";

export default function Home() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userType, setUserType] = useState("");
  // const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [createFormModalOpen, setCreateFormModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const router = useRouter();

  const handleSetUserType = (ut) => {
    setUserType(ut);
    setCreateUserModalOpen(false);
    setCreateFormModalOpen(true);
  };

  const handleCreateFormModalClose = () => {
    setCreateFormModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const onLoginSuccess = (user) => {
    closeModal();
    if (user.userType == "seller") {
      router.push("/supplier-management");
    } else {
      router.push("/tter-curate");
    }
    setUser(user);
  };

  return (
    <Box>
      <Head>
        <title>TikTok Collective</title>
        <link rel="icon" src="tiktok_icon.png" />
      </Head>
      <Navbar isLoggedIn={user} loginOnClick={openLoginModal}></Navbar>

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginForm _callback={onLoginSuccess}></LoginForm>
      </Modal>
      {/* MODAL user select which type to create */}
      <Modal
        isOpen={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
      >
        <Box justifyContent="space-between">
          <Typography variant="h2" sx={{ padding: 4, mb: 4 }}>
            Sign up as:
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mx: 4, backgroundColor: "#FE2C55" }}
            onClick={() => handleSetUserType("tiktoker")}
          >
            Tiktoker
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            sx={{ mx: 4 }}
            onClick={() => handleSetUserType("supplier")}
          >
            Supplier
          </Button>
        </Box>
      </Modal>
      {/* MODAL user fills in form */}
      <Modal
        isOpen={createFormModalOpen}
        onClose={() => handleCreateFormModalClose(false)}
        width="50%"
      >
        <CreateUserForm
          userType={userType}
          handleCreateFormModalClose={handleCreateFormModalClose}
        />
      </Modal>

      <main style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Sidebar user={user}></Sidebar>
      </main>
      <TailwindSpec></TailwindSpec>
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
    </Box>
  );
}
