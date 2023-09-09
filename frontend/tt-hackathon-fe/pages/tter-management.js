import Head from "next/head";
import styles from "../styles/TterManagement.module.css";
import { useContext, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { UserContext } from "./_app";
import AffiliateCard from "../components/AffiliateCard";
import AffiliateExplore from "../components/AffliateExplore";
import { affiliates, affliatesExplore } from "../utils/dummyData";

const cardContainerStyle = {
  width: '100%',
  backgroundColor: 'lightgrey',
  border: '2px solid #FF2D55', 
  color: 'white',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '16px',
  padding: '16px'
};


export default function TterManagement() {

  const { user, setUser } = useContext(UserContext);

  const [affiliateModals, setAffiliateModals] = useState(
    affiliates.map((affliate, index) => ({ isOpen: false, data:  affliate}))
  );

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
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px solid #FF2D55',
    color: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    overflowX: 'auto',
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
              {affiliates.map((affiliate, index) => (
                <AffiliateCard
                  key={index}
                  affiliate={affiliate}
                  isOpen={affiliateModals[index].isOpen}
                  data={affiliateModals[index].data}
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
