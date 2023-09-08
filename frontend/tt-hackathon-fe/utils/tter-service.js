// import products from "../mock/mock-seller-all-products.json";

// const getAllProducts = () => {
//   //MOCK
//   const allProducts = products.products;
//   return new Promise((resolve, reject) => {
//     resolve(allProducts);
//   });
// }
// export { getAllProducts };

const getAllProducts = () => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_all_products";
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Assuming the response contains JSON data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export { getAllProducts };
