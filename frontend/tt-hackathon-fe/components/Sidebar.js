import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../pages/_app";
import styles from "../styles/Sidebar.module.css";

const Sidebar = (props) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const determineColor = (check) => {
    const url = window.location.href.split("/").reverse()[0];
    if (check == url) {
      return {
        backgroundColor: "#fe2c56f9",
        color: "white",
      };
    }
    return {};
  };

  return (
    <>
      {user && user.userType == "seller" && (
        <div className={styles.sidebar}>
          <Link href="/supplier-analytics">
            <button style={determineColor("supplier-analytics")}>
              <i className="bi bi-graph-up-arrow"></i>
              <h1>Analytics</h1>
            </button>
          </Link>
          <Link href="/supplier-management">
            <button style={determineColor("supplier-management")}>
              <i className="bi bi-clipboard"></i>
              <h1>Management</h1>
            </button>
          </Link>
        </div>
      )}
      {user && user.userType == "tter" && (
        <div className={styles.sidebar}>
          <Link href="/tter-curate">
            <button style={determineColor("tter-curate")}>
              <i className="bi bi-search"></i>
              <h1>Curate</h1>
            </button>
          </Link>
          <Link href="/tter-management">
            <button style={determineColor("tter-management")}>
              <i className="bi bi-clipboard"></i>
              <h1>Management</h1>
            </button>
          </Link>
          <Link href="/tter-analytics">
            <button style={determineColor("tter-analytics")}>
              <i className="bi bi-graph-up-arrow"></i>
              <h1>Analytics</h1>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
