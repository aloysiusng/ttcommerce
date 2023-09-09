const doLoginWithEmailPassword = (loginCredentials) => {
  const { email, password } = loginCredentials;

  // MOCK FX
  if (email == "seller@gmail.com") {
    return {
      username: email,
      password: password,
      userType: "seller",
      userId: "7b0febb8-d61d-4ff6-be7c-120beb7ea691",
    };
  } else {
    return {
      username: email,
      password: password,
      userType: "tter",
      userId: "48479c4d-0419-45c8-8d84-d3997c673858",
    };
  } // END MOCK
};

export { doLoginWithEmailPassword };
