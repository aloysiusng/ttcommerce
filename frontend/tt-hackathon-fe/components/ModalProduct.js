import React, { useState } from "react";
import { toast } from "react-toastify";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/ModalProduct.module.css";
import {createListing} from "../utils/tter-service";

const ModalProduct = ({ product, handleClose }) => {
  const fontColor = product.quantity > 0 ? "green" : "red";
  const qtyRender = product.quantity > 0 ? product.quantity + " pcs stock" : "Out of Stock";
  const [listingPrice, setListingPrice] = useState(product.supplier_price.trim("$"));

  const dbugger = () => {
    toast.success(listingPrice);
  };
  async function submitCreateListing() {
    console.log("Creating listing for product: " + product.product_id);
    var body = {
      product_id: product.product_id,
      listing_price: listingPrice,
      tiktoker_id: "1879efc8-43b3-4ad8-90f8-565234115e20",
      // tiktoker_id: user.id,
    };
    console.log(body);
    try {
      createListing(body).then((res) => toast.success("Listing created!") && handleClose());
    } catch (error) {
      console.log("Error creating listing: " + error);
      toast.error("Error creating listing please contact support!");
    }
  }
  return (
    <>
      <div className={styles.modalProductContent}>
        <h1 className={styles.productName}>{product.product_name}</h1>
        <img className={styles.productImage} alt="product-image" src={product.image_url} />
        <h3 className={styles.para}>Cost Price: ${product.supplier_price}</h3>
        <p className={styles.para}>{product.description}</p>
        <p className={styles.para}>
          <font style={{ color: fontColor }}> {qtyRender} </font>
        </p>
        <br></br>
        <p className={styles.para}>Set your desired price below:</p>
        <input className={styles.listingPriceInput} type="number" value={listingPrice} onChange={() => setListingPrice(event.target.value)} />
        <div className={styles.buttons}>
          <button className={homeStyles.secondaryButton}>
            <h2>
              <i class="bi bi-chat-left-dots"></i>
            </h2>
          </button>
          <button className={homeStyles.secondaryButton} onClick={submitCreateListing} disabled={product.quantity < 0}>
            Create Listing
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalProduct;
