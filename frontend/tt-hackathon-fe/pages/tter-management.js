import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AffiliateCard from "../components/AffiliateCard";
import AffiliateExplore from "../components/AffliateExplore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/TterManagement.module.css";
import { affliatesExplore } from "../utils/dummyData";
import { getAllSuppliers, getAllSuppliersNotAffliated, getAllListing, getAllProductsNotInListing } from "../utils/tter-service";
import { UserContext } from "./_app";
import ListingExplore from "../components/ListingExplore";

// Listing
import ListingCard from "../components/ListingCard";

export default function TterManagement() {
  const { user, setUser } = useContext(UserContext);


  // AFFLIATE --------------------------------------------------
  const [affliateCards, setAffliateCards] = useState([]);

  const [affliateExplore, setAffliateExplore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tiktokerID = "48479c4d-0419-45c8-8d84-d3997c673858";

      try {
        const affiliatedSuppliers = await getAllSuppliers(tiktokerID);
        const initialAffiliateCards = affiliatedSuppliers.map(affiliate => ({ isOpen: false, data: affiliate }));
        setAffliateCards(initialAffiliateCards);

        const nonAffiliatedSuppliers = await getAllSuppliersNotAffliated(tiktokerID);
        const initialAffiliateExplore = nonAffiliatedSuppliers.map(affiliate => ({ isOpen: false, data: affiliate }));
        setAffliateExplore(initialAffiliateExplore);

        const listings = await getAllListing(tiktokerID);
        const initialListingCards = listings.map(listing => ({ data: listing }));
        setListingCards(initialListingCards);

        const productsNotInListing = await getAllProductsNotInListing(tiktokerID);
        const initialListingExplore = productsNotInListing.map(listing => ({ data: listing }));
        setListingExplore(initialListingExplore);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchData();
  }, []);


  const openModal = (index) => {
    const updatedAffiliateCards = [...affliateCards];
    updatedAffiliateCards[index].isOpen = true;
    setAffliateCards(updatedAffiliateCards);
  };

  const closeModal = (index) => {
    const updatedAffiliateCards = [...affliateCards];
    updatedAffiliateCards[index].isOpen = false;
    setAffliateCards(updatedAffiliateCards);
  };

  // AFFLIATE END --------------------------------------------------

  // LISTING --------------------------------------------------
  const [listingCards, setListingCards] = useState([]);

  const [listingExplore, setListingExplore] = useState([]);


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
              {affliateCards.map((affiliate, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <AffiliateCard key={index} affiliate={affliateCards[index].data} isOpen={affliateCards[index].isOpen} data={affliateCards[index].data} openModal={() => openModal(index)} closeModal={() => closeModal(index)} />
                </Grid>
              ))}
              <Grid xs={12}>
                <h6>Explore more affliates, improve your product range</h6>
              </Grid>
              {affliateExplore.map((affiliate, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <AffiliateExplore key={index} affiliate={affliateExplore[index].data} />
                </Grid>
              ))}
              <Grid xs={12}>
                <h1 className={styles.sectionTitle} style={{ marginTop: "10px" }}>Your Listings</h1>
              </Grid>
              <Grid xs={12}>
                <h4>Here you can view all your products you are listing on your account</h4>
              </Grid>
              {listingCards.map((listing, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <ListingCard key={index} listing={listingCards[index].data} />
                </Grid>
              ))}

              <Grid xs={12}>
                <h6>Explore more products, increase your revenue through more listings</h6>
              </Grid>
              {listingExplore.map((listing, index) => (
                <Grid xs={12} md={6} lg={4} xl={3}>
                  <ListingExplore key={index} listing={listingExplore[index].data} />
                </Grid>
              ))}
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
