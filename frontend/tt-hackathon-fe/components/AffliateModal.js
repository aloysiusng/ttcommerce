import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/AffliateModal.module.css';


const AffiliateModal = ({ isOpen, onRequestClose, data, modalType }) => {
    // TODO: data handling

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
                        {/* TODO: Create the rows and output based on product */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Item 1</td>
                                    <td>
                                        <button>Request Demo</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Item 2</td>
                                    <td>
                                        <button>Request Demo</button>
                                    </td>
                                </tr>
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
