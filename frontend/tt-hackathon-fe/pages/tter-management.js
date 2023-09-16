import { Box, Grid, Modal } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AffiliateCard from "../components/AffiliateCard";
import AffiliateExplore from "../components/AffliateExplore";
import ListingExplore from "../components/ListingExplore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/SupplierManagement.module.css";
import {
  getAllListing,
  getAllProductsNotInListing,
  getAllSuppliers,
  getAllSuppliersNotAffliated,
} from "../utils/tter-service";
import { UserContext } from "./_app";

// Listing
import ListingCard from "../components/ListingCard";
import ModalProduct from "../components/ModalProduct";

export default function TterManagement() {
  const { user, setUser } = useContext(UserContext);

  const affiliatePics = [
    "data:image/jpeg;base64,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",
    "https://media.istockphoto.com/id/1343288850/vector/three-elements-triangle-symbol.jpg?s=612x612&w=0&k=20&c=K5343K_QQhZgG0aiEmoJDhN3wYmx-WmVIK6k8kz-lMA=",
    "data:image/jpeg;base64,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",
    "https://img.freepik.com/free-vector/flat-design-go-logo-template_23-2148971218.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUlrtam6Z8nSGL_jDgfBn-KDyvcpjtZi1AAngPfCVdAlUy0foYxRl-JCAA_m78yw6OUU8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9xCFUYRI5Hotnv48RWMJrWbSQAP1yqudvGJ3ngLq8TvPHoD4Cnvwj_pr2ImPGqTe7He0&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcG2ChftZus1HqiCrAfBEK1dou5cXSmtjg78Rc2md1XCq1_5PYFSnF3lXZt4kETp59cYE&usqp=CAU",
  ];

  // AFFLIATE --------------------------------------------------
  const [affliateCards, setAffliateCards] = useState([]);

  const [affliateExplore, setAffliateExplore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tiktokerID = "48479c4d-0419-45c8-8d84-d3997c673858";

      try {
        const affiliatedSuppliers = await getAllSuppliers(tiktokerID);
        const initialAffiliateCards = affiliatedSuppliers.map((affiliate) => ({
          isOpen: false,
          data: affiliate,
        }));
        setAffliateCards(initialAffiliateCards);

        const nonAffiliatedSuppliers = await getAllSuppliersNotAffliated(
          tiktokerID
        );
        const initialAffiliateExplore = nonAffiliatedSuppliers.map(
          (affiliate) => ({ isOpen: false, data: affiliate })
        );
        setAffliateExplore(initialAffiliateExplore);

        const listings = await getAllListing(tiktokerID);
        const initialListingCards = listings.map((listing) => ({
          data: listing,
        }));
        setListingCards(initialListingCards);

        const productsNotInListing = await getAllProductsNotInListing(
          tiktokerID
        );
        const initialListingExplore = productsNotInListing.map((listing) => ({
          data: listing,
        }));
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

  const [openModal2, setOpenModal2] = useState(false);

  const [modalProduct, setModalProduct] = useState({});

  return (
    <div id="root" className={styles.container}>
      <Head>
        <title>TikTok Commerce | Commerce Management</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <Modal isOpen={false} onClose={() => setOpenModal2(false)}>
          <ModalProduct
            product={modalProduct}
            handleClose={() => setOpenModal2(false)}
          />
        </Modal>
        <div className={styles.contentContainer}>
          <h1 className={styles.sectionTitle} style={{ marginTop: "10px" }}>
            Manage Listings and Affiliates
          </h1>
          <div className={styles.carousell}>
            {listingCards.map((listing, index) => (
              <ListingCard key={index} listing={listingCards[index].data} />
            ))}
          </div>
          <div className={styles.carousell}>
            {affliateCards.map((affiliate, index) => (
              <AffiliateCard
                key={index}
                affiliate={affliateCards[index].data}
                isOpen={affliateCards[index].isOpen}
                data={affliateCards[index].data}
                openModal={() => openModal(index)}
                closeModal={() => closeModal(index)}
                pic={affiliatePics[Math.min(index, affiliatePics.length)]}
              />
            ))}
          </div>
          <br></br>
          <br></br>
          <h1 className={styles.sectionTitle} style={{ marginTop: "10px" }}>
            Recommended Products and Affiliates
          </h1>
          <div className={styles.carousell}>
            {listingExplore.map((listing, index) => (
              <ListingExplore
                key={index}
                listing={listingExplore[index].data}
                openModal={() => {
                  console.log("FIRED");
                  setOpenModal2(true);
                }}
              />
            ))}
          </div>
          <div className={styles.carousell}>
            {affliateExplore.map((affiliate, index) => (
              <AffiliateExplore
                key={index}
                affiliate={affliateExplore[index].data}
                pic={
                  affiliatePics[Math.max(0, affiliatePics.length - index - 1)]
                }
              />
            ))}
          </div>
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
