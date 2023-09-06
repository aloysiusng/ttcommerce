import React from "react";
import styles from "../styles/UserMiniCard.module.css";

const UserMiniCard = ({ user }) => {
  return (
    <div className={styles.userMiniCard} id={user.username}>
      <img
        className={styles.userImage}
        alt="user-image"
        src={user.profilePicUrl}
      />
      <div className={styles.userMiniCardContentColumn}>
        <h2 className={styles.userName}>{user.name}</h2>
        <p className={styles.userUsername}>{`@${user.username}`}</p>
      </div>
    </div>
  );
};

export default UserMiniCard;
