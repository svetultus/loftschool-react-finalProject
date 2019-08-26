export const getUserData = userName => {
  console.log("getUserData", "userName", userName);
  // fetch("").then(response => {
  //   return response.status === 200 ? response.json() : Promise.reject(response);
  // });
  const { cardName, cardNumber, expDate, cvv } = {
    cardName: "cardName",
    cardNumber: "cardNumber",
    expDate: "expDate",
    cvv: "cvv"
  };
  let testUser = { name: userName, cardName, cardNumber, expDate, cvv };
  let storage = localStorage;
  storage.setItem("loftTaxi1278", JSON.stringify(testUser));
  let data = storage.getItem("loftTaxi1278");
  let result;
  if (data) {
    return {
      success: true,
      user: JSON.parse(data)
    };
  } else return { success: false };
};
