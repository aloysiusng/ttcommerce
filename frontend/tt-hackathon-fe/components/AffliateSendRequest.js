import emailjs from "emailjs-com";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import styles from "../styles/AffliateModal.module.css";

const AffiliateSendRequest = ({ isOpen, onRequestClose, type }) => {
  const [formData, setFormData] = useState({
    name: "Tiktoker",
    email: "tiktoker.email",
    subject: "Request from Tiktoker",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendRequest = () => {
    emailjs
      .send(
        "service_wcx7kto",
        "template_3gj0475",
        {
          to_name: "Recipient Name",
          from_name: formData.name,
          subject: formData.subject + " from " + formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        "1z0Dl3kxB_YAoIbOc"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success("Email request sent successfully!");
        // Clear the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        onRequestClose();
      })
      .catch((error) => {
        toast.error("Email request failed!");
        console.error("Email sending failed:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles["modal-container"]} overlayClassName={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        {type === 1 ? <h2 className={styles["modal-header"]}>Contact Affliated Supplier</h2> : <h2 className={styles["modal-header"]}>Request new affliation with Supplier</h2>}

        <form className={styles["modal-form"]}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" cols="50" value={formData.message} onChange={(e) => handleChange(e)} />
          <button type="button" onClick={handleSendRequest} className={styles["modal-button"]}>
            Send Request
          </button>
        </form>
        <button type="button" onClick={onRequestClose} className={styles["modal-button"]}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AffiliateSendRequest;
