// import products from "../mock/mock-seller-all-products.json";

// const getAllProducts = () => {
//   //MOCK
//   const allProducts = products.products;
//   return new Promise((resolve, reject) => {
//     resolve(allProducts);
//   });
// }
// export { getAllProducts };

const getAllProducts = async () => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_all_products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const createListing = async (body) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/create_listing";
  try {
    console.log(body)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getAllProducts, createListing };