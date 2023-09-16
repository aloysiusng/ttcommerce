import Head from "next/head";
import styles from "../styles/TterAnalytics.module.css";
import { useEffect, useContext, useState } from "react";
import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { UserContext } from "./_app";
import SellerMiniCard from "../components/TopSellerCard";
import StackedBarChart from "../components/TterStackedBarChart";
import { getTiktokerById, getSupplierById } from "../utils/topseller-service";
import { getAllListing } from "../utils/tter-service";
import ListingCard from "../components/ListingCard";
import ListingMiniCard from "../components/ListingMiniCard";
import listings from "../mock/mock-listing-products.json";

export default function SupplierAnalytics() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const tiktokerID = "48479c4d-0419-45c8-8d84-d3997c673858";
      try {
        const listings = await getAllListing(tiktokerID);
        const initialListingCards = listings.map((listing) => ({
          data: listing,
        }));

        setListingCards(initialListingCards);
        const quantities = [];
        for (let i = 0; i < initialListingCards.length; i++) {
          quantities.push(initialListingCards.length - i);
        }
        setQuantities(quantities);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchData();
  }, []);
  const [listingCards, setListingCards] = useState([]);
  const [quantities, setQuantities] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>TikTok Commerce | Tiktoker Analytics</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={user}></Navbar>

      <main>
        <Sidebar user={user}></Sidebar>
        <div className={styles.contentContainer}>
          {/*
          <h1 className={styles.sectionTitle}>
            Total Orders:{" "}
            <span className={styles.red}>
              {supplier.length != 0 ? supplier.orders.length : 0}
            </span>
          </h1> */}
          <div className={styles.metrics}>
            <div className={styles.sales_info_card}>
              <div className={styles.sales_info_item}>
                <div className={styles.sales_info_label}>
                  Total Profit to date:
                </div>
                <div className={styles.sales_info_value}>$300.15</div>
              </div>
              <div className={styles.sales_info_item}>
                <div className={styles.sales_info_label}>
                  Total Profit for this month:
                </div>
                <div className={styles.sales_info_value}>$115.78</div>
              </div>
              <div className={styles.sales_info_item}>
                <div className={styles.sales_info_label}>
                  Total Revenue for this month:
                </div>
                <div className={styles.sales_info_value}>$344.12</div>
              </div>
              <div className={styles.sales_info_item}>
                <div className={styles.sales_info_label}>
                  Total Items Sold this month:
                </div>
                <div className={styles.sales_info_value}>37</div>
              </div>
              <div className={styles.sales_info_item}>
                <div className={styles.sales_info_label}>
                  Total Orders this month:
                </div>
                <div className={styles.sales_info_value}>19</div>
              </div>
            </div>
            <br></br>
            <div className={styles.topSellingAffiliates}>
              <h1 className={styles.sectionTitle}>Top Selling Products</h1>
              <div className={styles.carousell}>
                {listings.listing.map((product, index) => (
                  <ListingMiniCard
                    key={index}
                    listing={product}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <StackedBarChart />
          </div>
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
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
