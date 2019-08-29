export const getUserData = userName => {
  // fetch("").then(response => {
  //   return response.status === 200 ? response.json() : Promise.reject(response);
  // });
  // const { cardName, cardNumber, expDate, cvv } = {
  //   cardName: "cardName",
  //   cardNumber: "cardNumber",
  //   expDate: "expDate",
  //   cvv: null
  // };
  // let testUser = { name: userName, cardName, cardNumber, expDate, cvv };

  let storage = localStorage;
  let data = storage.getItem("loftTaxiUser");
  if (data) {
    return {
      success: true,
      user: JSON.parse(data)
    };
  } else return { success: false };
};
