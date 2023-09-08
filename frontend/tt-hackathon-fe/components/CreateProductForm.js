import React from "react";
import { useState } from "react";
import styles from "../styles/CreateProductForm.module.css";
import { createProduct } from "../utils/seller-service";

const CreateProductForm = (props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setSupplierPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct({
      description: description,
      product_name: productName,
      supplier_id: "TEST",
      image: imageBase64,
      quantity: quantity,
      supplier_price: price,
    });
    setProductName("");
    setDescription("");
    setImageBase64("");
    setQuantity("");
    setSupplierPrice("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64img = ev.target.result;
        setImageBase64(base64img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Create a new product</h1>
      {imageBase64.length > 0 && (
        <img className={styles.productImage} src={imageBase64} alt="Uploaded" />
      )}
      <label htmlFor="productName" className={styles.label}>
        Product Name
      </label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className={styles.input}
        required
      />
      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        className={styles.fr}
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ height: "100px" }}
      />
      <label htmlFor="quantity" className={styles.label}>
        Quantity
      </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className={styles.input}
        required
      />
      <label htmlFor="price" className={styles.label}>
        Price ($)
      </label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setSupplierPrice(e.target.value)}
        className={styles.input}
        required
      />
      <div style={{ marginTop: "2em" }}>
        <label htmlFor="image" className={styles.label}>
          Attach Image
        </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <button type="submit" className={styles.submitButton}>
        <h1>Create</h1>
      </button>
    </form>
  );
};

export default CreateProductForm;
