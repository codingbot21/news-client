import { API } from "../../backend";

// CATEGORY

/**
 * CREATE A NEWS CATEGORY
 * @param userId
 * @param token
 * @param category
*/
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * CREATE A NEWS CATEGORY
 * @param categoryId
*/
export const getCategory = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * GET ALL NEWS CATEGORY
*/
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * UPDATE A NEWS CATEGORY
 * @param categoryId
 * @param userId
 * @param token
 * @param category
*/
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: category
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * DELETE A NEWS CATEGORY
 * @param userId
 * @param token
 * @param category
*/
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// NEWS

/**
 * CREATE A NEWS
 * @param userId
 * @param token
 * @param news
*/
export const createNews = (userId, token, news) => {
  return fetch(`${API}/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: news,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * GET ALL NEWS
*/
export const getAllNews = () => {
  return fetch(`${API}/all/all-live-news`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * DELETE A NEWS
 * @param newsId
 * @param userId
 * @param token
*/
export const deleteNews = (newsId, userId, token) => {
    return fetch(`${API}/${newsId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

/**
 * GET A NEWS
 * @param newsId
*/
export const getNews = newsId => {
    return fetch(`${API}/live/${newsId}`, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

/**
 * UPDATE A NEWS
 * @param newsId
 * @param userId
 * @param token
 * @param news
*/
export const UpdateNews = (newsId, userId, token, news) => {
  return fetch(`${API}/update/${newsId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: news
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};