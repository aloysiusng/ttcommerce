import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import { useContext, useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { UserContext } from "./_app";

export default function Home() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userType, setUserType] = useState("");
  // const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [createFormModalOpen, setCreateFormModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

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
      <Modal isOpen={createUserModalOpen} onClose={() => setCreateUserModalOpen(false)}>
        <Box justifyContent="space-between">
          <Typography variant="h2" sx={{ padding: 4, mb: 4 }}>
            Sign up as:
          </Typography>
          <Button variant="contained" size="large" sx={{ mx: 4, backgroundColor: "#FE2C55" }} onClick={() => handleSetUserType("tiktoker")}>
            Tiktoker
          </Button>
          <Button variant="outlined" size="large" color="error" sx={{ mx: 4 }} onClick={() => handleSetUserType("supplier")}>
            Supplier
          </Button>
        </Box>
      </Modal>
      {/* MODAL user fills in form */}
      <Modal isOpen={createFormModalOpen} onClose={() => handleCreateFormModalClose(false)} width="50%">
        <CreateUserForm userType={userType} handleCreateFormModalClose={handleCreateFormModalClose} />
      </Modal>

      <main style={{ display: "flex", width: "100%", overflow: "hidden" }}>
        <Sidebar user={user}></Sidebar>
      </main>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Tiktok Commmerce.
              <strong className="font-extrabold sm:block" style={{ color: "#FE2C55" }}>
                Where E-Commerce meets Social Media
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">Livestreaming for Tiktokers has never been so rewarding before.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a className="block w-full rounded px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" style={{ backgroundColor: "#FE2C55" }} onClick={() => setCreateUserModalOpen(true)}>
                Get Started
              </a>

              <a className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto" href="#learn-more-section">
                Learn More
              </a>
            </div>
          </div>
        </div>

        <section id="learn-more-section" className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
          <img alt="Student" src="tiktok_live.jpg" className="h-56 w-full object-cover sm:h-full" />

          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">With Tiktok Ecommerce, tiktokers who go live have an added value to livestream more often.</h2>

              <p className="hidden text-gray-500 md:mt-4 md:block">Get connected with suppliers around the world and curate your product collection to sell to your audience. Forget all the hassle cause Tiktok ecommerce will handle all the shipping and logistics for you through the suppliers. Your only job is to go live and sell and of course, make a profit with every sale.</p>

              <div className="mt-4 md:mt-8">
                <a className="inline-block rounded px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400" style={{ backgroundColor: "#FE2C55" }}>
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Don't worry Suppliers, we got you covered too.</h2>

              <p className="hidden text-gray-500 md:mt-4 md:block">With Tiktok commerce, gone are the days where you have to worry about marketing or sales. Focus on what you do best, which is to produce quality products and ship them to customers. Leave the rest to Tiktokers, who will sell your products to their audience in their own creative ways.</p>

              <div className="mt-4 md:mt-8">
                <a className="inline-block rounded px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400" style={{ backgroundColor: "#FE2C55" }}>
                  Get Started Today
                </a>
              </div>
            </div>
          </div>

          <img alt="Supply Chain" src="supply_chain.jpg" className="h-56 w-full object-cover sm:h-full" />
        </section>

        <footer className="bg-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-center text-teal-600">
              <img src="tiktok_icon.png" className="h-12 w-12" alt="Tiktok Logo" />
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
              This project is an independent creation made for TikTok's 2023 Hackathon. <br></br>It is not affiliated with or endorsed by TikTok.
            </p>

            <ul className="mt-12 flex justify-center gap-6 md:gap-8">
              <li>
                <a href="/" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:text-gray-700/75">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </section>

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
