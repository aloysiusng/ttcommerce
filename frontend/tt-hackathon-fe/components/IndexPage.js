import { Container, Paper } from "@mui/material";
import React from "react";

function IndexPage() {
  return (
    <Container maxWidth="none">
      <img
        src="tiktok_bg.png"
        alt="Background"
        style={{
          width: "100%",
          height: "100vh-100px",
          overflow: "hidden",
        }}
      />
      <Paper
        square
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10rem",
          elevation: 5,
          width: "50%",
          backgroundColor: "#f5f7fa",
        }}>
        <h1 style={{ textAlign: "center", paddingBottom: "20px" }}>
          Welcome to TikTok <font color="#fe2c55">Commerce</font>
        </h1>
        <p style={{ textAlign: "center", paddingBottom: "20px" }}>
          Where content creators are <b>empowered</b> to become retailers
        </p>
      </Paper>
    </Container>
  );
}

export default IndexPage;
