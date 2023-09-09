import React, { useState } from "react";
import styles from "../styles/AffliateCard.module.css";
import AffiliateModal from "./AffliateModal";
import AffiliateSendRequest from "./AffliateSendRequest";

const AffiliateCard = ({ affiliate, isOpen, data, openModal, closeModal }) => {
    const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);

    const openRequestModal = () => {
        setRequestModalIsOpen(true);
    };

    const closeRequestModal = () => {
        setRequestModalIsOpen(false);
    };

    return (
        <div className={styles['affiliate-card-container']}>
            <div className={styles['affiliate-card']}>
                <div>
                    <h2>{affiliate.name}</h2>
                    <p>{affiliate.category}</p>
                </div>
                <div className={styles['affiliate-image']}>
                    <img
                        src='man.png'
                        alt={`Image of ${affiliate.name}`}
                    />
                </div>
                <div className={styles['affiliate-buttons']}>
                    <button className={styles['contact-button']} onClick={() => openModal()}>Contact Supplier</button>
                    <button className={styles['request-button']} onClick={() => openRequestModal()}>Send Request</button>
                </div>
            </div>
            <AffiliateModal
                isOpen={isOpen}
                onRequestClose={() => closeModal()}
                data={data}
                modalType={1}
            />
            {requestModalIsOpen && (
                <AffiliateSendRequest
                    isOpen={requestModalIsOpen}
                    onRequestClose={closeRequestModal}
                    type = {1}
                />
            )}
        </div>
    );
};

export default AffiliateCard;