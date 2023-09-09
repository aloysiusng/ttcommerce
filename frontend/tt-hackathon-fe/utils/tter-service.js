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


const getAllListingBySellerID = async (sellerID) => {
  var url = ""
  // Get listings via Tiktok ID 
  // Get listing price, reviews and product iD
  // Product details for below
}

const getAllAffiliatesBySellerId = async (sellerId) => {
  var url = ""
  // Get affiliates via Tiktok ID
  // use get aflliates to  see if user_id is in the list
  // display
}

export { getAllProducts, createListing };