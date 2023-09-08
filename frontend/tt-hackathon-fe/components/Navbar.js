import React from "react";
import styles from "../styles/Home.module.css";
import { UserContext } from "../pages/_app";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    setUser({});
    router.push("/");
  };
  return (
    <>
      <header>
        <Link href="/">
          <h1 className={styles.title}>
            TikTok <span className={styles.red}>Commerce</span>
          </h1>
        </Link>
        <button
          className={styles.primaryButton}
          onClick={() => {
            if (!user?.userType) {
              props.loginOnClick();
            } else logout();
          }}
        >
          <h1>{user?.userType ? "Log out" : "Log in"}</h1>
        </button>
      </header>

      <style jsx>{`
        header {
          width: 100%;
          height: 100px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0em 2em;
        }
      `}</style>
    </>
  );
};

export default Navbar;
