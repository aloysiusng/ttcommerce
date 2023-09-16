import React, { useState } from "react";
import styles from "../styles/AffliateCard.module.css";
import productStyles from "../styles/ProductCard.module.css";
import { deleteListing } from "../utils/tter-service";
import { toast } from "react-toastify";

const ListingCard = ({ listing }) => {
  const handleDelete = async () => {
    try {
      await deleteListing(listing.listing_id);
      toast.success("Listing deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Error deleting listing");
    }
  };

  const determineProfit = (listing) => {
    const profit =
      parseFloat(listing.listing_price) -
      parseFloat(listing.product.supplier_price);
    if (profit > 0) {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "green" }}>
          {"⬆ $" + profit.toFixed(2)}
        </h1>
      );
    } else if (profit < 0) {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "red" }}>
          {"⬇ -$" + Math.abs(profit).toFixed(2)}
        </h1>
      );
    } else {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "slategrey" }}>
          {"― $" + profit}
        </h1>
      );
    }
  };

  const determinePercentageProfit = (listing) => {
    const profit = (
      ((parseFloat(listing.listing_price) -
        parseFloat(listing.product.supplier_price)) /
        parseFloat(listing.product.supplier_price)) *
      100
    ).toFixed(2);
    if (profit > 0) {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "green" }}>
          {"⬆ " + profit + "%"}
        </h1>
      );
    } else if (profit < 0) {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "red" }}>
          {"⬇ " + profit + "%"}
        </h1>
      );
    } else {
      return (
        <h1 style={{ marginBottom: "0.5em", color: "slategrey" }}>
          {"― " + profit + "%"}
        </h1>
      );
    }
  };

  return (
    <div className={styles["listing-card"]}>
      <div className={styles["listing-card-internal"]}>
        <div className={styles["product-info"]}>
          <h2>{listing.product.product_name}</h2>
          <p>{listing.product.description}</p>
        </div>
        <button
          className={styles["secondaryButton"]}
          onClick={() => handleDelete()}
        >
          <i style={{ fontSize: "2em" }} className="bi bi-trash3"></i>
        </button>
      </div>
      <div
        className={styles["listing-card-internal"]}
        style={{ marginTop: "1em", justifyContent: "space-around" }}
      >
        <img
          className={productStyles.productImage}
          style={{
            maxWidth: "20em",
            margin: 0,
            alignSelf: "center",
          }}
          src={listing.product.image_url}
          alt={`Image of ${listing.product.product_name}`}
        />
        <div className={styles["listing-card-internal-stats"]}>
          <p>Listed for</p>
          <h2>${listing.listing_price}</h2>
          <p>Bought for</p>
          <h2>${listing.product.supplier_price}</h2>
          <p>Profit</p>
          {determineProfit(listing)}
          <p>Profit margin</p>
          {determinePercentageProfit(listing)}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
