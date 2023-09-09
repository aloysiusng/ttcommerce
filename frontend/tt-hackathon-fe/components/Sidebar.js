import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../pages/_app";
import styles from "../styles/Sidebar.module.css";

const Sidebar = (props) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      {user && user.userType == "seller" && (
        <div className={styles.sidebar}>
          <Link href="/supplier-analytics">
            <button>
              <i className="bi bi-graph-up-arrow"></i>
              <h1>Analytics</h1>
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
        </div>
      )}
    </>
  );
};

export default Sidebar;
