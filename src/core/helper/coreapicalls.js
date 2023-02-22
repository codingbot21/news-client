import { API } from "../../backend";

export const getNews = () => {
  return fetch(`${API}/all`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log());
};
