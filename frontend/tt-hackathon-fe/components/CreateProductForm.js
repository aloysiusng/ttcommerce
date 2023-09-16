import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/CreateProductForm.module.css";
import { createProduct, deleteProduct } from "../utils/seller-service";

const CreateProductForm = (props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setSupplierPrice] = useState("");
  const [picChanged, setPicChanged] = useState(false);

  useEffect(() => {
    if (props.productToEdit) {
      setProductName(props.productToEdit.product_name);
      setDescription(props.productToEdit.description);
      setQuantity(props.productToEdit.quantity);
      setSupplierPrice(props.productToEdit.supplier_price);
      setImageBase64(props.productToEdit.image_url);
    }
  }, []);

  const handleDelete = async () => {
    await deleteProduct(props.productToEdit);
    props.changesMade();
    props.closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.productToEdit) {
      const image = picChanged ? imageBase64.slice(23) : imageBase64;
      await createProduct({
        product_id: props.productToEdit.product_id,
        description: description,
        product_name: productName,
        supplier_id: "7b0febb8-d61d-4ff6-be7c-120beb7ea691", //CHANGE THIS ONCE USER LOGIN IMPLEMENTED
        image: image,
        quantity: quantity,
        supplier_price: price,
      });
    } else {
      await createProduct({
        description: description,
        product_name: productName,
        supplier_id: "7b0febb8-d61d-4ff6-be7c-120beb7ea691", //CHANGE THIS ONCE USER LOGIN IMPLEMENTED
        image: imageBase64.slice(23),
        quantity: quantity,
        supplier_price: price,
      });
    }
    setProductName("");
    setDescription("");
    setImageBase64("");
    setQuantity("");
    setSupplierPrice("");
    props.changesMade();
    props.closeModal();
  };

  const handleImageUpload = (e) => {
    setPicChanged(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64img = ev.target.result;
        setImageBase64(base64img);
        console.log(base64img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>{props.isEdit ? "Edit a product" : "Create a new product"}</h1>
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required={!props.productToEdit}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        <h1>{props.isEdit ? "Update" : "Create"}</h1>
      </button>
      {props.productToEdit && (
        <button
          type="button"
          onClick={() => {
            handleDelete();
          }}
          className={styles.secondaryButton}
        >
          <h1>Delete Product</h1>
        </button>
      )}
    </form>
  );
};

export default CreateProductForm;
