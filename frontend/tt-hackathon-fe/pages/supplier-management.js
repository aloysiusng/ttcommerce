import Head from "next/head";
import styles from "../styles/SupplierManagement.module.css";
import { useContext, useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { UserContext } from "./_app";
import {
  getAllAffiliatesBySellerId,
  getAllProductsBySellerId,
} from "../utils/seller-service";
import ProductCard from "../components/ProductCard";
import UserMiniCard from "../components/UserMiniCard";

export default function SupplierManagement() {
  const { user, setUser } = useContext(UserContext);
  const [sellerAllProducts, setSellerAllProducts] = useState([]);
  const [sellerAllAffiliates, setSellerAllAffiliates] = useState([]);

  async function fetchSellerAllProducts() {
    try {
      const products = await getAllProductsBySellerId(user.email);
      setSellerAllProducts(products);
      console.log(products);
    } catch (error) {
      console.log("Error fetching seller all products: " + error);
      alert("Error retrieving products from the backend");
    }
  }

  async function fetchSellerAllAffiliates() {
    try {
      const affiliates = await getAllAffiliatesBySellerId(user.email);
      setSellerAllAffiliates(affiliates);
      console.log(affiliates);
    } catch (error) {
      console.log("Error fetching seller all affiliates: " + error);
      alert("Error retrieving affiliates from the backend");
    }
  }

  useEffect(() => {
    fetchSellerAllAffiliates();
    fetchSellerAllProducts();
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Seller Management</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          <h1 style={{ alignSelf: "flex-start", justifySelf: "flex-start" }}>
            Your Products
          </h1>
          <div className={styles.carousell}>
            {sellerAllProducts?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <h1
            style={{
              alignSelf: "flex-start",
              justifySelf: "flex-start",
              marginTop: "1em",
            }}
          >
            Your TikTok Affiliates
          </h1>
          <div className={styles.carousell}>
            {sellerAllAffiliates?.map((affiliate) => (
              <UserMiniCard user={affiliate} />
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
