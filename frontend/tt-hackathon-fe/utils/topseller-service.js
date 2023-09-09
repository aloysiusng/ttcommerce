import suppliers from "../mock/mock-supplier.json";
import tiktokers from "../mock/mock-tiktokers.json";

/* API LIST
1) get_tiktoker_by_id
2) get_supplier_by_id
*/

const getTiktokerById = async (tiktokerId) => {
//   //MOCK
//   const tiktoker = tiktokers;
//   return new Promise((resolve, reject) => {
//     resolve(tiktoker);
//   });

  var url = `https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_tiktoker_by_id?tiktoker_id=${tiktokerId}`;
  try {
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getSupplierById = async (supplierId) => {
  //MOCK
  const requestBody = { "supplier_id": supplierId }
//   const supplier = ;
//   return new Promise((resolve, reject) => {
//     resolve(supplier);
//   });

  var url = `https://iytttt1316.execute-api.ap-southeast-1.amazonaws.com/api/get_supplier_by_id?supplier_id=${supplierId}`;
  try {
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getTiktokerById, getSupplierById };
