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
import styles from "../styles/TterCurate.module.css";
import { getAllProducts } from "../utils/tter-service";
import { UserContext } from "./_app";

export default function TterCurate() {
  const { user, setUser } = useContext(UserContext);

  const [allProducts, setAllProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchAllProducts() {
    getAllProducts()
      .then((res) => setAllProducts(JSON.parse(res.products)))
      .catch((err) => toast.error("Error fetching products please contact support!"));
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
        {/* modal open when product*/}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <ModalProduct product={modalProduct} handleClose={() => setOpenModal(false)} />
        </Modal>
        {/* main content */}
        <Box sx={{ pt: 4, width: "80%" }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Grid>
            <Grid xs={12}>
              <h1 className={styles.sectionTitle}>Products Available</h1>
            </Grid>
            {allProducts.map((product) => (
              <Grid xs={12} md={6} lg={4} xl={3}>
                <div
                  key={product.product_id}
                  onClick={() => {
                    setOpenModal(true);
                    setModalProduct(product);
                  }}>
                  <ProductCard product={product} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
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
