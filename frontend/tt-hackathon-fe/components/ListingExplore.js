import React, { useState } from "react";
const listingCardSmallStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "200px",
    backgroundColor: "",
    border: "2px solid rgb(104, 201, 208)",
    color: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
    padding: "8px",
    textAlign: "center",
};

const buttonStyle = {
    margin: "2px 8px",
    padding: "8px 16px",
    backgroundColor: "rgb(104, 201, 208)",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};


const ListingExplore = ({ listing }) => {

    return (
        <div style={listingCardSmallStyle}>
            <h3 style={{ color: "red" }}>{listing.product_name}</h3>
            <h4 style={{ color: "black" }} >Quantity: {listing.quantity}</h4>
            <div>
                <img style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    src={listing.image_url}
                />
            </div>
            <p style={{ color: "black", margin: "10px" }}>Price: ${listing.supplier_price}</p>
            <button style={buttonStyle}>
                View Product
            </button>
        </div>
    );
};

export default ListingExplore;
