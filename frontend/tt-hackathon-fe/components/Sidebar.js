import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { UserContext } from "../pages/_app";
import { useContext, useState } from "react";

const Sidebar = (props) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <>
      {user && user.userType == "seller" && (
        <div className={styles.sidebar}>
          <Link href="/supplier-management">
            <button>
              <i className="bi bi-graph-up-arrow"></i>
              <h1>Analytics</h1>
            </button>
          </Link>
          <Link href="/supplier-explore">
            <button>
              <i className="bi bi-search"></i>
              <h1>Explore</h1>
            </button>
          </Link>
          <Link href="/supplier-management">
            <button>
              <i className="bi bi-clipboard"></i>
              <h1>Management</h1>
            </button>
          </Link>
        </div>
      )}
      {user && user.userType == "tter" && (
        <div className={styles.sidebar}>
          <Link href="/tter-curate">
            <button>
              <i className="bi bi-search"></i>
              <h1>Curate</h1>
            </button>
          </Link>
          <Link href="/tter-management">
            <button>
              <i className="bi bi-clipboard"></i>
              <h1>Management</h1>
            </button>
          </Link>
          <Link href="/tter-progress">
            <>
              <button>
                <i className="bi bi-graph-up-arrow"></i>
                <h1>Progress</h1>
              </button>
            </>
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
