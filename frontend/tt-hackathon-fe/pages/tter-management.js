import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import AffiliateCard from "../components/AffiliateCard";
import AffiliateExplore from "../components/AffliateExplore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/TterManagement.module.css";
import { affliatesExplore } from "../utils/dummyData";
import { UserContext } from "./_app";
import { getAllSuppliers } from "../utils/tter-service";


export default function TterManagement() {

  const { user, setUser } = useContext(UserContext);
  const [affliateCards, setAffliateCards] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const tiktokerID = '48479c4d-0419-45c8-8d84-d3997c673858';
        const filteredSuppliers = await getAllSuppliers(tiktokerID);
        const initialAffiliateCards = filteredSuppliers.map((affliate, index) => ({ isOpen: false, data: affliate }));
        setAffliateCards(initialAffiliateCards);

      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
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
          <h1 className={styles.sectionTitle}>Management</h1>
          <h4>Here you can manage your Tiktok Commerce</h4>

          <h1 className={styles.sectionTitle}>Your Affiliates</h1>
          <div>
            <h4>Here you can view all your affiliates and manage them</h4>
            <div className={styles}>
              {affliateCards.map((affiliate, index) => (
                <AffiliateCard
                  key={index}
                  affiliate={affliateCards[index].data}
                  isOpen={affliateCards[index].isOpen}
                  data={affliateCards[index].data}
                  openModal={() => openModal(index)}
                  closeModal={() => closeModal(index)}
                />
              ))}
            </div>
            <h6>Explore more affliates, improve your product range</h6>
            <div>
              {affliatesExplore.map((affiliate, index) => (
                <AffiliateExplore key={index} affiliate={affiliate} />
              ))}
            </div>
          </div>

          <h1 className={styles.sectionTitle}>Your Listings</h1>
          <div>
            <h4>Here you can view all your products you are listing on your account</h4>
            <div>
              <p>This is a sample section with a TikTok-like card UI.</p>
            </div>
            <h6>Explore more products, increase your revenue through more listings</h6>
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
