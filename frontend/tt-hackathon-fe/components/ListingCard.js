import React, { useState } from "react";
import styles from "../styles/AffliateCard.module.css";
import { deleteListing }  from "../utils/tter-service";
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
    }

    return (
        <div className={styles['affiliate-card-container']}>
            <div className={styles['listing-card']}>
                <div className={styles['product-info']}>
                    <h2>{listing.product.product_name}</h2>
                    <p>{listing.product.description}</p>
                </div>
                <div className={styles['affiliate-image']}>
                    <img
                        src={listing.product.image_url}
                        alt={`Image of ${listing.product.product_name}`}
                    />
                </div>
                <div className={styles['price-info']}>
                    <h2>Price: ${listing.listing_price}</h2>
                    <h3>Supplier Price: ${listing.product.supplier_price}</h3>
                    <h4>Profit: ${parseFloat(listing.listing_price) - parseFloat(listing.product.supplier_price)}</h4>
                    <h5>Profit Margin: {((parseFloat(listing.listing_price) - parseFloat(listing.product.supplier_price)) / parseFloat(listing.product.supplier_price) * 100).toFixed(2)}%</h5>
                </div>
                <div className={styles['product-reviews']}>
                    <h5>Number of reviews: {listing.reviews.length}</h5>
                </div>
                <div className={styles['affiliate-buttons']}>
                    <button className={styles['request-button']} onClick={() => handleDelete()}>Delete Listing</button>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;