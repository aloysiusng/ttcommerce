import React from "react";
import styles from "../styles/ProductCard.module.css";
import listingStyles from "../styles/AffliateCard.module.css";

const ListingExplore = ({ listing, openModal }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardContent}>
        <h2 className={styles.productName}>{listing.product_name}</h2>
        <img className={styles.productImage} src={listing.image_url} />
        <p className={styles.productDescription}>{listing.description}</p>
        <div style={{ justifySelf: "flex-end" }}>
          <h2 className={styles.productPrice}>${listing.supplier_price}</h2>
          <p
            className={styles.productQuantity}
            style={{ marginBottom: "1em" }}
          >{`${listing.quantity} pcs stock`}</p>
        </div>
        <button
          style={{ justifySelf: "flex-end" }}
          className={listingStyles.hackButton2}
          onClick={() => {
            openModal();
          }}
        >
          <h2>Add to Listing</h2>
        </button>
      </div>
    </div>
  );
};

export default ListingExplore;
