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

const getProductById = async (id) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_product?product_id=" + id;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }
  catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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


const getAllListing = async (tiktokerID) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_all_listings";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Filter for listings under tiktokerID
    const parsedData = await response.json();
    const parsedListings = JSON.parse(parsedData.listings);
    const filteredListings = parsedListings.filter((listing) =>
      listing.tiktoker_id == tiktokerID
    );

    for (var i = 0; i < filteredListings.length; i++) {
      const product = await getProductById(filteredListings[i].product_id);
      filteredListings[i].product = product;
    }


    return filteredListings;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const getAllProductsNotInListing = async (tiktokerID) => {
  var listings = await getAllListing(tiktokerID);
  var suppliers = await getAllSuppliers(tiktokerID);
  var productList = [];
  console.log(suppliers);
  for (var i = 0; i < suppliers.length; i++){
    var products = await getAllProductsbySupplier(suppliers[i].supplier_id);
    productList = productList.concat(products);
  }
  var productsNotInListing = [];
  for (var i = 0; i < productList.length; i++){
    var product = productList[i];
    var isInListing = false;
    for (var j = 0; j < listings.length; j++){
      if (product.product_id == listings[j].product_id){
        isInListing = true;
        break;
      }
    }
    if (!isInListing){
      productsNotInListing.push(product);
    }
  }
  return productsNotInListing;
}

const getAllSuppliers = async (tiktokerID) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_all_suppliers";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Filter for affliates
    const parsedData = await response.json();
    const parsedSuppliers = JSON.parse(parsedData.suppliers);
    const filteredSuppliers = parsedSuppliers.filter((supplier) =>
      supplier.tiktokers.includes(tiktokerID)
    );

    return filteredSuppliers;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const getAllSuppliersNotAffliated = async (tiktokerID) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_all_suppliers";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Filter for non-affliates
    const parsedData = await response.json();
    const parsedSuppliers = JSON.parse(parsedData.suppliers);
    const filteredSuppliers = parsedSuppliers.filter((supplier) =>
      !(supplier.tiktokers.includes(tiktokerID))
    );

    return filteredSuppliers;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const getAllProductsbySupplier = async (supplierID) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_products_by_supplier?supplier_id=" + supplierID;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const parsedData = await response.json();

    return parsedData;

  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

const deleteListing = async (listingID) => {
  var url = "https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/delete_listing?listing_id=" + listingID;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const parsedData = await response.json();

    return parsedData;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

export { getAllProducts, createListing, getAllSuppliers, getAllSuppliersNotAffliated, getAllProductsbySupplier, getAllListing, deleteListing, getAllProductsNotInListing };