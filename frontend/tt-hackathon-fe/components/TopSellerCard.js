import React from "react";
import styles from "../styles/TopSellerCard.module.css";

const SellerMiniCard = ({ seller, orders }) => {
  return (
    <div className={styles.sellerMiniCard} id={seller.tiktoker_id}>
      <div className={styles.sellerMiniCardContentRow}>
        <img
          className={styles.sellerImage}
          alt="seller-image"
          src={seller.profilepic_url}
        />
        <div className={styles.sellerMiniCardContentColumn}>
          <h2 className={styles.sellerName}>{seller.name}</h2>
          <p className={styles.sellerUsername}>{`@${seller.username}`}</p>
        </div>
      </div>
      <div className={styles.sellerMiniCardContentRow}>
        <p>{`${orders} orders fulfilled`}</p>
      </div>
    </div>
  );
};

export default SellerMiniCard;
