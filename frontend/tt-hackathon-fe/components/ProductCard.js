import React from "react";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product }) => {
  // handle insanely loooong product descriptions
  var desc =
    product.description.length > 65
      ? product.description.substring(0, 62) + "..."
      : product.description;
  return (
    <div className={styles.productCard} id={product.product_id}>
      <div className={styles.productCardContent}>
        <h2 className={styles.productName}>{product.productName}</h2>
        <img
          className={styles.productImage}
          alt="product-image"
          src={product.imageUrl}
        />
        <p className={styles.productDescription}>{product.description}</p>
        <div style={{ justifySelf: "flex-end" }}>
          <h2 className={styles.productPrice}>${product.price}</h2>
          <p
            className={styles.productQuantity}
          >{`${product.quantity} pcs stock`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;