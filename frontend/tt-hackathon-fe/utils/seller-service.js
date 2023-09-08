import products from "../mock/mock-seller-all-products.json";
import affiliates from "../mock/mock-seller-all-affiliates.json";

/* API LIST
1) createProduct(productName, price, desc, qty, supplierId, image) // all params string
2) updateProduct(productId, editedFieldsJson) 
3) deleteProduct(productId)

1) getAllProductsBySupplier(supplierId) // returns {products:[{prod1Obj}, …]}
2) getAllAffiliatesUnderSupplier(supplierId) // returns {affiliates:[{user1Obj}, …]}
3) getAllOrdersBySupplier(supplierId) // returns {orders:[{order1Obj1}, …]}
*/

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
