import React from "react";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product, handleEdit, nonEditable }) => {
  // handle insanely loooong product descriptions
  //var desc = product.description.length > 65 ? product.description.substring(0, 62) + "..." : product.description;
  return (
    <div className={styles.productCard} id={product.product_id}>
      <div className={styles.productCardContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h2 className={styles.productName}>{product.product_name}</h2>
          <button
            hidden={nonEditable}
            className={styles.secondaryButton}
            onClick={() => handleEdit(product)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                style={{ fontSize: "2em" }}
                className="bi bi-pencil-square"
              ></i>
            </div>
          </button>
        </div>
        <img
          className={styles.productImage}
          alt="product-image"
          src={product.image_url}
        />

        <p className={styles.productDescription}>{product.description}</p>
        <div style={{ justifySelf: "flex-end" }}>
          <h2 className={styles.productPrice}>${product.supplier_price}</h2>
          <p
            className={styles.productQuantity}
          >{`${product.quantity} pcs stock`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
