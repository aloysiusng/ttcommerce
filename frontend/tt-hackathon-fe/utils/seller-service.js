import products from "../mock/mock-seller-all-products.json";
import affiliates from "../mock/mock-seller-all-affiliates.json";
import orders from "../mock/mock-seller-all-orders.json";

/* API LIST
1) createProduct(productName, price, desc, qty, supplierId, image) // all params string
2) updateProduct(productId, editedFieldsJson) 
3) deleteProduct(productId)

1) getAllProductsBySupplier(supplierId) // returns {products:[{prod1Obj}, …]}
2) getAllAffiliatesUnderSupplier(supplierId) // returns {affiliates:[{user1Obj}, …]}
3) getAllOrdersBySupplier(supplierId) // returns {orders:[{order1Obj1}, …]}
*/

const getAllProductsBySellerId = async (sellerId) => {
  //const apiUrl = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_orders_of_supplier?supplier_id=7b0febb8-d61d-4ff6-be7c-120beb7ea691";
  const apiUrl =
    "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_products_by_supplier?supplier_id=7b0febb8-d61d-4ff6-be7c-120beb7ea691";
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllAffiliatesBySellerId = (sellerId) => {
  //MOCK
  const apiUrl =
    "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_affiliates_under_supplier?supplier_id=7b0febb8-d61d-4ff6-be7c-120beb7ea691";
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllOrdersBySellerId = (sellerId) => {
  //MOCK
  const apiUrl =
    "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_orders_of_supplier?supplier_id=7b0febb8-d61d-4ff6-be7c-120beb7ea691";
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const deleteProduct = (product) => {
  const url =
    "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/delete_product";
  const requestOptions = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      product_id: product.product_id,
    }),
  };
  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
};

const createProduct = (product) => {
  // DONE
  console.log(product);
  const url =
    "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/create_product";
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product),
  };
  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
};

export {
  getAllProductsBySellerId,
  getAllAffiliatesBySellerId,
  getAllOrdersBySellerId,
  createProduct,
  deleteProduct,
};
