import React from "react";
import styles from "../styles/ListingMiniCard.module.css";

const ListingMiniCard = ({ listing }) => {
  return (
    <div className={styles.listingMiniCard} id={listing.id}>
      <div className={styles.listingMiniCardContentRow}>
        <img
          className={styles.listingImage}
          alt="listing-image"
          src={listing.image_url}
        />
        <div className={styles.listingMiniCardContentColumn}>
          <h2 className={styles.listingName}>{listing.name}</h2>
          <p className={styles.listingUsername}>{listing.price}</p>
        </div>
      </div>
      <div className={styles.listingMiniCardContentRow}>
        <p>{`${listing.quantity} sold`}</p>
      </div>
    </div>
  );
  };
  
  export default ListingMiniCard;