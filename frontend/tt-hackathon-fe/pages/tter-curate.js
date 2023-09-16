import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import ModalProduct from "../components/ModalProduct";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/SupplierManagement.module.css";
import { getAllProducts } from "../utils/tter-service";
import { UserContext } from "./_app";

export default function TterCurate() {
  const { user, setUser } = useContext(UserContext);

  const [allProducts, setAllProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  async function fetchAllProducts() {
    getAllProducts()
      .then((res) => {
        setAllProducts(JSON.parse(res.products));
        setFilteredProducts(JSON.parse(res.products));
      })
      .catch((err) =>
        toast.error("Error fetching products please contact support!")
      );
  }
  const handleClear = () => {
    setSearchQuery("");
    setFilteredProducts(allProducts);
  };
  const handleSearch = () => {
    const filteredResults = allProducts.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredResults);
  };

  useEffect(() => {
    fetchAllProducts();
    setFilteredProducts(allProducts);
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
        {/* modal open when product*/}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <ModalProduct
            product={modalProduct}
            handleClose={() => setOpenModal(false)}
          />
        </Modal>
        {/* main content */}
        <div className={styles.contentContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleClear={handleClear}
            style={{ marginTop: "10px" }}
          />
          <h1 className={styles.sectionTitle} style={{ marginTop: "1em" }}>
            Products Available
          </h1>
          <div className={styles.carousell2}>
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                onClick={() => {
                  setOpenModal(true);
                  setModalProduct(product);
                }}
              >
                <ProductCard
                  product={product}
                  nonEditable={true}
                  fixHeight={true}
                />
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
