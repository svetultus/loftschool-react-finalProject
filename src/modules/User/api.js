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
  return {
    success: true,
    user: { name: userName, cardName, cardNumber, expDate, cvv }
  };
};
