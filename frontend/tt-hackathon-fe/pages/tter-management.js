import Head from "next/head";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/SupplierAnalytics.module.css";
import { UserContext } from "./_app";

export default function TterManagement() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Commerce Management</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          <h1>MANAGEMENT</h1>
        </div>
      </main>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
