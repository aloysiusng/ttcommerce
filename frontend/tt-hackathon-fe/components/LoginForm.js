import React from "react";
import { useState } from "react";
import styles from "../styles/LoginForm.module.css";
import { doLoginWithEmailPassword } from "../utils/login-service";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = doLoginWithEmailPassword({ email: email, password: password });
    console.log(user);
    props._callback(user);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <br></br>
      <h1 className={styles.title}>
        Log in to TikTok <span className={styles.red}>Commerce</span>
      </h1>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "10px",
          alignSelf: "flex-end",
        }}
      >
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        <h1>Log in</h1>
      </button>
      <br></br>
      <div>
        <hr></hr>
        <p style={{ fontSize: "0.75em" }}>
          This project is an independent creation made for TikTok's 2023
          Hackathon. <br></br>It is not affiliated with or endorsed by TikTok.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
