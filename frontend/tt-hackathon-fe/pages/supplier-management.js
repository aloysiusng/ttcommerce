import Head from "next/head";
import styles from "../styles/SupplierManagement.module.css";
import { useContext, useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { UserContext } from "./_app";
import {
  getAllAffiliatesBySellerId,
  getAllOrdersBySellerId,
  getAllProductsBySellerId,
} from "../utils/seller-service";
import ProductCard from "../components/ProductCard";
import UserMiniCard from "../components/UserMiniCard";
import Modal from "../components/Modal";
import CreateProductForm from "../components/CreateProductForm";

export default function SupplierManagement() {
  const { user, setUser } = useContext(UserContext);
  const [sellerAllProducts, setSellerAllProducts] = useState([]);
  const [sellerAllAffiliates, setSellerAllAffiliates] = useState([]);
  const [sellerAllOrders, setSellerAllOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  async function fetchSellerAllOrders() {
    try {
      const orders = await getAllOrdersBySellerId(user.email);
      setSellerAllOrders(orders);
      console.log(orders);
    } catch (error) {
      console.log("Error fetching seller all orders: " + error);
      alert("Error retrieving orders from the backend");
    }
  }

  useEffect(() => {
    fetchSellerAllAffiliates();
    fetchSellerAllProducts();
    fetchSellerAllOrders();
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Seller Management</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType == "createProduct" && (
          <CreateProductForm></CreateProductForm>
        )}
      </Modal>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          <h1 className={styles.sectionTitle}>Your Orders</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Unit Cost</th>
                <th>Total Quantity</th>
                <th>Total Cost</th>
                <th>Affiliate Seller</th>
                <th>OMS Link</th>
              </tr>
            </thead>
            <tbody>
              {sellerAllOrders.map((order) => (
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.product.product_name}</td>
                  <td>{order.product.supplier_price}</td>
                  <td>{order.quantity}</td>
                  <td>
                    $
                    {(
                      Number(order.quantity) *
                      Number(order.product.supplier_price.slice(1))
                    ).toFixed(2)}
                  </td>
                  <td>{`${order.buyer.name} (@${order.buyer.username})`}</td>
                  <td>
                    <button
                      className={styles.secondaryButton}
                      style={{ padding: "0.8em 1em" }}
                      onClick={() => {
                        alert(
                          "Feature unimplemented: \nSeller's OMS will be linked and opened locally."
                        );
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5em",
                        }}
                      >
                        <i
                          style={{ fontSize: "1.3em" }}
                          className="bi bi-box-arrow-right"
                        ></i>
                        <p>Open in OMS</p>
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className={styles.sectionTitle}>Your Products</h1>
            <button
              className={styles.primaryButton}
              style={{ padding: "0.8em 1em" }}
              onClick={() => {
                openModal("createProduct");
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7em",
                }}
              >
                <i
                  style={{ fontSize: "1.7em" }}
                  className="bi bi-plus-square"
                ></i>
                <h2>Add Product</h2>
              </div>
            </button>
          </div>
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
