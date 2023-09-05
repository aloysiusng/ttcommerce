const doLoginWithEmailPassword = (loginCredentials) => {
  const { email, password } = loginCredentials;
  // MOCK FX
  if (email == "seller@gmail.com") {
    return {
      username: email,
      password: password,
      userType: "seller",
    };
  } else {
    return {
      username: email,
      password: password,
      userType: "tter",
    };
  } // END MOCK
};

export { doLoginWithEmailPassword };
