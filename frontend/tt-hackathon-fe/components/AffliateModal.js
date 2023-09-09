import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../styles/AffliateModal.module.css';
import { getAllProductsbySupplier } from '../utils/tter-service.js';


const AffiliateModal = ({ isOpen, onRequestClose, data, modalType }) => {
    const [products, setProducts] = useState([]);
    const [requestedDemos, setRequestedDemos] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchProducts = async () => {
                try {
                    console.log(data)
                    console.log(data.supplier_id)
                    const productsData = await getAllProductsbySupplier("9a62670a-30f6-4860-9dc6-b40e30447e50");
                    setProducts(productsData);
                    console.log(productsData);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };

            fetchProducts();
        }
    }, [isOpen, data.supplier_id]);

    const handleRequestDemo = (productId) => {
        setRequestedDemos(prev => [...prev, productId]);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Contact Supplier Modal"
        >
            {modalType === 1 ? (
                <div className={styles["modal-container"]}>
                    <div className={styles["modal-content"]}>
                        <h2 className={styles["modal-header"]}>Request Sent</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>quantity</th>
                                    <th>Supplier Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.product_name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.supplier_price}</td>
                                        <button className={styles['request-button']}
                                            onClick={() => handleRequestDemo(product.id)}
                                            style={requestedDemos.includes(product.id) ? { backgroundColor: 'green' } : {}}
                                        >
                                            Request Demo
                                        </button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className={styles["modal-button"]}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles['modal-container']}>
                    <div className={styles['modal-content']}>
                        <h2 className={styles['modal-header']}>Invalid Modal Type</h2>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default AffiliateModal;
