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
  const [topSellers, setTopSellers] = useState({});
  const [tiktokers, setTiktokers] = useState([]);
  const [tiktoker_ids, setTiktokerIds] = useState([]);

  async function fetchSupplier() {
    try {
      // const current_supplier = await getSupplierById(supplierId);
      getSupplierById(supplierId).then((res) => setSupplier(res));
      // setSupplier(current_supplier);
      console.log("supplier is " + supplier);
      console.log("keys are " + topSellers)
    } catch (error) {
      console.log("Error fetching supplier: " + error);
      alert("Error retrieving supplier from the backend");
    }
  }

  async function fetchTopSellers() {
    console.log(supplier.tiktokers_sales)
    const sellers = Object.entries(supplier.tiktokers_sales);
    sellers.sort((x, y) => y[1] - x[1]);
    console.log("sellers are" + JSON.stringify(sellers));

    for (let i = 0; i < sellers.length; i++) {
      await fetchTiktokers(sellers[i][0], sellers[i][1]);
    }
  }

  async function fetchTiktokers(tiktokerId, numOrders) {
    
    try {
      await getTiktokerById(tiktokerId).then((res) => {
        // tiktoker.put("numOrders", sellers[i][1])
        res.numOrders = numOrders;
        console.log("res numOrders is " + res.numOrders);
        if(!tiktoker_ids.includes(res.tiktoker_id)) {
          tiktokers.push(res);
          const updated_tiktoker_ids = [...tiktoker_ids];
          updated_tiktoker_ids.push(res.tiktoker_id);
          setTiktokerIds(updated_tiktoker_ids);
        }
        console.log("tiktokers are " + res);
      });
      setTiktokers(tiktokers);
      
    } catch (error) {
      console.log("Error fetching tiktoker: " + error);
      alert("Error retrieving tiktoker from the backend");
    }
  }

  useEffect(() => {
    fetchSupplier();
    if (supplier.length != 0) {
      setTopSellers(supplier.tiktokers_sales);
    }
    if (Object.keys(topSellers).length != 0) {
      fetchTopSellers();
    }
    // fetchTiktokers();
  }, [supplier.supplier_id, Object.keys(topSellers).length]);

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
          <h1 className={styles.sectionTitle}>Total Orders: <span className={styles.red}>{supplier.length != 0 ? supplier.orders.length : 0}</span></h1>
          <br></br>
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
