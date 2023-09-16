import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/ModalProduct.module.css";
import stylesMain from "../styles/CreateProductForm.module.css";
import { createListing } from "../utils/tter-service";
import { UserContext } from "../pages/_app";

const ModalProduct = ({ product, handleClose }) => {
  const fontColor = product.quantity > 0 ? "green" : "red";
  const qtyRender =
    product.quantity > 0
      ? "Available: " + product.quantity + " pcs"
      : "Out of Stock";
  const [listingPrice, setListingPrice] = useState(
    product.supplier_price.trim("$")
  );
  const { user, setUser } = useContext(UserContext);

  const dbugger = () => {
    toast.success(listingPrice);
  };
  async function submitCreateListing() {
    console.log("Creating listing for product: " + product.product_id);
    var body = {
      product_id: product.product_id,
      listing_price: listingPrice,
      // tiktoker_id: "1879efc8-43b3-4ad8-90f8-565234115e20",
      tiktoker_id: user.userId,
    };
    console.log(body);

    createListing(body)
      .then((res) => toast.success("Listing created!") && handleClose())
      .catch((err) =>
        toast.error("Error creating listing please contact support!")
      );
  }
  return (
    <>
      <div className={styles.modalProductContent} style={{ width: "50vh" }}>
        <h1 className={styles.productName}>{product.product_name}</h1>
        <img
          className={styles.productImage}
          alt="product-image"
          src={product.image_url}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "grey" }}>Supplier's Price Quote</p>
          <h1 style={{ marginBottom: "1em" }}>${product.supplier_price}</h1>
          <p style={{ color: "grey" }}>Description</p>
          <h2 style={{ marginBottom: "1em", textAlign: "left" }}>
            {product.description}
          </h2>
          <p style={{ marginBottom: "1.5em" }}>
            <font style={{ color: fontColor }}> {qtyRender} </font>
          </p>
          <p style={{ color: "grey" }}>Listing Price</p>
          <input
            className={styles.listingPriceInput}
            type="number"
            value={listingPrice}
            onChange={() => setListingPrice(event.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <button className={stylesMain.secondaryButton}>
            <h2>
              <i class="bi bi-chat-left-dots"></i>
            </h2>
          </button>
          <button
            className={stylesMain.submitButton}
            onClick={submitCreateListing}
            disabled={product.quantity < 0}
          >
            <h2>Create Listing</h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalProduct;
