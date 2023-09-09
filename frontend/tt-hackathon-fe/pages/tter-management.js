import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useContext, useState } from "react";
import AffiliateCard from "../components/AffiliateCard";
import AffiliateExplore from "../components/AffliateExplore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/TterManagement.module.css";
import { affiliates } from "../utils/dummyData";
import { UserContext } from "./_app";

const cardContainerStyle = {
  width: "100%",
  backgroundColor: "lightgrey",
  border: "2px solid #FF2D55",
  color: "white",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "16px",
  padding: "16px",
};

export default function TterManagement() {
  const { user, setUser } = useContext(UserContext);

  const [affiliateModals, setAffiliateModals] = useState(affiliates.map((affliate, index) => ({ isOpen: false, data: affliate })));

  const openModal = (index) => {
    const updatedModals = [...affiliateModals];
    updatedModals[index].isOpen = true;
    setAffiliateModals(updatedModals);
  };

  const closeModal = (index) => {
    const updatedModals = [...affiliateModals];
    updatedModals[index].isOpen = false;
    setAffiliateModals(updatedModals);
  };

  const cardContainerStyle = {
    width: "100%",
    backgroundColor: "lightgrey",
    border: "2px solid #FF2D55",
    color: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    overflowX: "auto",
  };

  return (
    <div id="root" className={styles.container}>
      <Head>
        <title>TikTok Commerce | Commerce Management</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div>
          <Box sx={{ pt: 4 }}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <h1 className={styles.sectionTitle}>Management</h1>
              </Grid>
              <Grid xs={12}>
                <h4>Here you can manage your Tiktok Commerce</h4>
              </Grid>
              <Grid xs={12}>
                <h1 className={styles.sectionTitle}>Your Affiliates</h1>
              </Grid>
              <Grid xs={12}>
                <h4>Here you can view all your affiliates and manage them</h4>
              </Grid>
              {affiliates.map((affiliate, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <AffiliateCard key={index} affiliate={affiliate} isOpen={affiliateModals[index].isOpen} data={affiliateModals[index].data} openModal={() => openModal(index)} closeModal={() => closeModal(index)} />
                </Grid>
              ))}
              <Grid xs={12}>
                <h6>Explore more affliates, improve your product range</h6>
              </Grid>
              {affiliates.map((affiliate, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <AffiliateExplore key={index} affiliate={affiliate} />
                </Grid>
              ))}

              <Grid xs={12}>
                <h4>Here you can view all your products you are listing on your account</h4>
              </Grid>
              <Grid xs={12}>
                <p>This is a sample section with a TikTok-like card UI.</p>
              </Grid>
              <Grid xs={12}>
                <h6>Explore more products, increase your revenue through more listings</h6>
              </Grid>
            </Grid>
          </Box>
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
