import emailjs from "emailjs-com";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import styles from "../styles/AffliateModal.module.css";
import style2 from "../styles/CreateProductForm.module.css";
import { affiliateWithSupplier } from "../utils/tter-service";

const AffiliateSendRequest = ({
  isOpen,
  onRequestClose,
  type,
  supplier_id,
}) => {
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

  const handleSendRequest = async () => {
    try {
      const response = await affiliateWithSupplier((supplier_id = supplier_id));
      toast.success("Affiliated with supplier successfully!");
    } catch (error) {
      onRequestClose();
      toast.error("Affiliation failed: " + error);
      return;
    }
    emailjs
      .send(
        "service_wcx7kto",
        "template_3gj0475",
        {
          to_name: "TechWave",
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
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Email request failed!");
        console.error("Email sending failed:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles["modal-container"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["modal-content"]}>
        {type === 1 ? (
          <h1 className={styles["modal-header"]}>Contact Affliated Supplier</h1>
        ) : (
          <h1 className={styles["modal-header"]}>
            Request new affliation with Supplier
          </h1>
        )}
        <br></br>
        <form className={styles["modal-form"]}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            cols="50"
            value={formData.message}
            onChange={(e) => handleChange(e)}
          />
          <button
            type="button"
            onClick={handleSendRequest}
            className={style2["submitButton"]}
          >
            <h2>Send Request</h2>
          </button>
        </form>
        <button
          type="button"
          onClick={onRequestClose}
          className={style2["secondaryButton"]}
          styles={{ width: "5em" }}
        >
          <h2>Close</h2>
        </button>
      </div>
    </Modal>
  );
};

export default AffiliateSendRequest;
