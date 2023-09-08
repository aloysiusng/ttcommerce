import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/sidebar";
import styles from "../styles/TterCurate.module.css";
import { getAllProducts } from "../utils/tter-service";
import { UserContext } from "./_app";

export default function TterCurate() {
  const { user, setUser } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);

  async function fetchAllProducts() {
    try {
      getAllProducts().then((res) => setAllProducts(JSON.parse(res.products)));
    } catch (error) {
      console.log("Error fetching all products: " + error);
      alert("Error retrieving products from the backend");
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Curate Products</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          <h1 className={styles.sectionTitle}>Products Available</h1>
          <div className={styles.productCardContainer}>
            {allProducts.map((product) => (
              <div className={styles.productCardWrapper} key={product.product_id}>
                <ProductCard product={product} />
              </div>
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
