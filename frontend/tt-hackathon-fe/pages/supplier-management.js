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
import { toast } from "react-toastify";

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
      toast.error("Error retrieving products please contact support!");
    }
  }

  async function fetchSellerAllAffiliates() {
    try {
      const affiliates = await getAllAffiliatesBySellerId(user.email);
      setSellerAllAffiliates(affiliates);
      console.log(affiliates);
    } catch (error) {
      console.log("Error fetching seller all affiliates: " + error);
      toast.error("Error retrieving affiliates please contact support!");
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
          <h1 className={styles.sectionTitle}>Your Orders</h1>
          <table>
            <th>header 1</th>
            <th>header 2</th>
            <th>header 3</th>
            <tr>
              <td>0,0</td>
              <td>0,1</td>
              <td>0,2</td>
            </tr>
          </table>
          <h1 className={styles.sectionTitle}>Your Products</h1>
          <div className={styles.carousell}>
            {sellerAllProducts?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <h1 className={styles.sectionTitle}>Your TikTok Affiliates</h1>
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
