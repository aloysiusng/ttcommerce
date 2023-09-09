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

const handleLogin = async (email, password) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/login_user";
  try {
    console.log(body);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const handleCreateUser = async (body) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/create_user";
  try {
    console.log(body);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export { doLoginWithEmailPassword, handleCreateUser, handleLogin };
