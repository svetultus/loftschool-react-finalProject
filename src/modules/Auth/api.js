export const authUser = (userName, userPassword) =>
  fetch(
    `https://loft-taxi.glitch.me/auth?username=${userName}&password=${userPassword}`
  ).then(response => {
    return response.status === 200 ? response.json() : Promise.reject(response);
  });
