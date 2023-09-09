import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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


  // Tiktok login area 
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      fetch('https://api.tiktok.com/v1/user/info/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('API Request Failed');
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.error('API Request Error:', error);
        });
    }
  }, [accessToken]);

  const initiateTikTokLogin = async () => {
    router.push('/api/oauth');
  };
  //End of tiktok login code logic 

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
        {accessToken ? (
          <div>
            <p>Authenticated</p>
            {userInfo && (
              <div>
                <p>User Info:</p>
                <pre>{JSON.stringify(userInfo, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <button onClick={initiateTikTokLogin}>
            Login with TikTok
          </button>
        )}
      </div>
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
