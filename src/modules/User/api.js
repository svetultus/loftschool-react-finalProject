export const getUserData = userName => {
  let storage = localStorage;
  let data = storage.getItem("loftTaxiUser");
  if (data) {
    return {
      success: true,
      user: JSON.parse(data)
    };
  } else return { success: false };
};
