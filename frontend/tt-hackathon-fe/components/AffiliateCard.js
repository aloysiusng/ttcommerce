import React, { useState } from "react";
import styles from "../styles/AffliateCard.module.css";
import AffiliateModal from "./AffliateModal";
import AffiliateSendRequest from "./AffliateSendRequest";

const AffiliateCard = ({
  affiliate,
  isOpen,
  data,
  openModal,
  closeModal,
  pic,
}) => {
  console.log(pic);
  console.log(data);
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);

  const openRequestModal = () => {
    setRequestModalIsOpen(true);
  };

  const closeRequestModal = () => {
    setRequestModalIsOpen(false);
  };

  return (
    <div className={styles["affiliate-card-container"]}>
      <div className={styles["affiliate-card"]}>
        <div
          className={styles["affiliate-image"]}
          style={{
            backgroundImage: `url(${pic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className={styles["tag"]}>
            <i
              style={{ fontSize: "1em", marginRight: "0.5em" }}
              className="bi bi-tag-fill"
            ></i>
            {String(affiliate.category).split(" ")[0]}
          </h3>
        </div>
        <div style={{ textAlign: "center", padding: "0em 1em" }}>
          <h1>{affiliate.name}</h1>
          <p style={{ color: "grey", wordBreak: "break-word" }}>
            {affiliate.description}
          </p>
        </div>
        <div className={styles["affiliate-buttons"]}>
          <button
            disabled={true}
            onClick={() => openModal()}
            className={styles.hackButton}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1em",
                alignContent: "center",
              }}
            >
              <i
                style={{ fontSize: "2em" }}
                className="bi bi-telephone-forward"
              ></i>
              <h2 style={{ alignSelf: "center" }}>Contact</h2>
            </div>
          </button>

          <button
            onClick={() => openRequestModal()}
            className={styles.hackButton}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1em",
                alignContent: "center",
              }}
            >
              <i
                style={{ fontSize: "2em" }}
                className="bi bi-chat-left-quote"
              ></i>
              <h2 style={{ alignSelf: "center" }}>Request</h2>
            </div>
          </button>
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
          type={1}
        />
      )}
    </div>
  );
};

export default AffiliateCard;
