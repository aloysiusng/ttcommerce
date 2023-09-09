import Head from "next/head";
import styles from "../styles/SupplierAnalytics.module.css";
import { useEffect, useContext, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { UserContext } from "./_app";
import SellerMiniCard from "../components/TopSellerCard";
import {
  getTiktokerById,
  getSupplierById,
} from "../utils/topseller-service";

export default function SupplierManagement() {
  const { user, setUser } = useContext(UserContext);
  const [supplier, setSupplier] = useState([]);
  const [supplierId, setSupplierId] = useState("7b0febb8-d61d-4ff6-be7c-120beb7ea691")
  const [topSellers, setTopSellers] = useState([]);
  const [tiktokers, setTiktokers] = useState([]);

  async function fetchSupplier() {
    try {
      const current_supplier = await getSupplierById(supplierId);
      // getSupplierById(supplierId).then((res) => setSupplier(res));
      setSupplier(current_supplier);
      console.log("supplier is " + supplier);
      setTopSellers(supplier.tiktokers_sales)
    } catch (error) {
      console.log("Error fetching supplier: " + error);
      alert("Error retrieving supplier from the backend");
    }
  }

  async function fetchTopSellers() {
    console.log(supplier.tiktokers_sales)
    const sellers = Object.entries(supplier.tiktokers_sales);
    sellers.sort((x, y) => x[1] - y[1]);
    console.log(JSON.stringify(sellers));

    for (let seller in sellers) {
      try {
        const tiktoker = await getTiktokerById(seller[0]);
        console.log("tiktoker is " + tiktoker)
        tiktokers.push(tiktoker);
        setTiktokers(tiktokers);
        console.log(tiktokers);
      } catch (error) {
        console.log("Error fetching tiktoker: " + error);
        alert("Error retrieving tiktoker from the backend");
      }
    }
  }

  async function fetchTiktokers() {
    
    try {
      const tiktoker = await getTiktokerById(user.email);
      tiktokers.push(tiktoker)
      setTiktokers(tiktokers);
      console.log(tiktokers)
    } catch (error) {
      console.log("Error fetching tiktoker: " + error);
      alert("Error retrieving tiktoker from the backend");
    }
  }

  useEffect(() => {
    fetchSupplier();
    fetchTopSellers();
    // fetchTiktokers();
  }, [supplierId]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Seller Analytics</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          <h1 className={styles.sectionTitle}>Total Orders</h1>
          <div className={styles.description}>
            20
          </div>
          <h1 className={styles.sectionTitle}>Top Selling Affiliates</h1>
          <div className={styles.carousell}>
            {tiktokers?.map((affiliate) => (
              <SellerMiniCard seller={affiliate} />
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
