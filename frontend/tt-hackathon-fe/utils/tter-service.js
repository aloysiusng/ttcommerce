import products from "../mock/mock-seller-all-products.json";

const getAllProducts = () => {
  //MOCK
  const allProducts = products.products;
  return new Promise((resolve, reject) => {
    resolve(allProducts);
  });
}
export { getAllProducts };