import React, { useState } from "react";
import AffiliateSendRequest from "./AffliateSendRequest";

const affiliateCardSmallStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "200px",
    backgroundColor: "",
    border: "2px solid #FF2D55",
    color: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px",
    padding: "8px",
    textAlign: "center",
};

const buttonStyle = {
    margin: '2px 8px',
    padding: '8px 16px',
    backgroundColor: '#FF2D55',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const buttonStyle_two = {
    margin: '2px 8px',
    padding: '8px 16px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const AffiliateExplore = ({ affiliate }) => {
    const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);

    const openRequestModal = () => {
        setRequestModalIsOpen(true);
    };

    const closeRequestModal = () => {
        setRequestModalIsOpen(false);
    };

    return (
        <div style={affiliateCardSmallStyle}>
            <h3 style={{ color: "red" }}>{affiliate.category}</h3>
            <img
                src={affiliate.imageUrl}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p style={{ color: "black", margin: "10px" }}>{affiliate.description}</p>
            {/* Redirect to View page with get all products */}
            <button style={buttonStyle}>View products</button>
            <button style={buttonStyle_two} onClick={() => openRequestModal()}>Request Affliation</button>
            {requestModalIsOpen && (
                <AffiliateSendRequest
                    isOpen={requestModalIsOpen}
                    onRequestClose={closeRequestModal}
                    type={2}
                />
            )}
        </div>
    );
};

export default AffiliateExplore;