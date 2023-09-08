import products from "../mock/mock-seller-all-products.json";
import affiliates from "../mock/mock-seller-all-affiliates.json";

const getAllProductsBySellerId = (sellerId) => {
  //MOCK
  const allProducts = products.products;
  return new Promise((resolve, reject) => {
    resolve(allProducts);
  });
};

const getAllAffiliatesBySellerId = (sellerId) => {
  //MOCK
  const allAffiliates = affiliates.affiliates;
  return new Promise((resolve, reject) => {
    resolve(allAffiliates);
  });
};

export { getAllProductsBySellerId, getAllAffiliatesBySellerId };
