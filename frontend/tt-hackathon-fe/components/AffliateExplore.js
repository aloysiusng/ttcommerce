import React, { useState } from "react";
import AffiliateSendRequest from "./AffliateSendRequest";
import styles from "../styles/AffliateCard.module.css";
import { useRouter } from "next/router";

const AffiliateExplore = ({ affiliate, pic }) => {
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);
  const router = useRouter();

  const openRequestModal = () => {
    setRequestModalIsOpen(true);
  };

  const closeRequestModal = () => {
    setRequestModalIsOpen(false);
  };

  const redirectToCurate = () => {
    router.push("/tter-curate");
  };

  return (
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
          className={styles.hackButton2}
          onClick={() => redirectToCurate()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1em",
              alignContent: "center",
            }}
          >
            <i style={{ fontSize: "2em" }} className="bi bi-box-seam"></i>
            <h2 style={{ alignSelf: "center" }}>Products</h2>
          </div>
        </button>
        <button
          className={styles.hackButton2}
          onClick={() => openRequestModal()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1em",
              alignContent: "center",
            }}
          >
            <i style={{ fontSize: "2em" }} className="bi bi-person-plus"></i>
            <h2 style={{ alignSelf: "center" }}>Affiliate</h2>
          </div>
        </button>
      </div>
      {requestModalIsOpen && (
        <AffiliateSendRequest
          isOpen={requestModalIsOpen}
          onRequestClose={closeRequestModal}
          type={2}
          supplier_id={affiliate.supplier_id}
        />
      )}
    </div>
  );
};

export default AffiliateExplore;
