import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

import {
  getAllCategories,
  getNews,
  UpdateNews,
} from "./helper/admin-api-calls";
import { isAutheticated } from "../user-auth/index";

const UpdateNewsPage = ({ match }) => {
  const { user, token } = isAutheticated();

  // const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    summary: "",
    description: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdNews: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    summary,
    description,
    categories,
    category,
    loading,
    error,
    createdNews,
    getaRedirect,
    formData,
  } = values;

  const preload = (newsId) => {
    getNews(newsId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          summary: data.summary,
          description: data.description,
          category: data.category._id,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log("TRYING TO FIND ERROR", data.err);

        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.newsId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    UpdateNews(match.params.newsId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          summary: "",
          description: "",
          photo: "",
          loading: false,
          createdNews: data.name,
        });
      }
    });
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? " " : "none" }}
      >
        <h4>{error} News created successfully..</h4>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdNews ? " " : "none" }}
      >
        <h4>{createdNews} NEws updated successfully..</h4>
      </div>
    );
  };

  const UpdateNewsPage = () => (
    <form>
      <span>Re Upload a new photo</span>
      <div className="form-group d-grid">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <span>News Title</span>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <span>Summary</span>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("summary")}
          name="photo"
          className="form-control"
          placeholder="Short Description about the news"
          value={summary}
        />
      </div>

      <span>Description</span>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          style={{ height: "800px" }}
          placeholder="Description"
          value={description}
        />
      </div>

      <span>Change Category</span>
      <div className="form-group mt-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <br />
      <br />

      <div className="d-grid mt-3">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3 rounded-pill"
          to="/manage/news"
        >
          Update Live News
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="THE NEWS"
      description="Update news here"
      className="container bg-success p-4"
    >
      <Link to="/manage/news" className="btn btn=md btn-dark mb-3">
        Back to Admin Menu
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {UpdateNewsPage()}
          {errorMessage()}
          {successMessage()}
          <br />
          <center>
            <Link
              to={`/admin/readmore/${match.params.newsId}`}
              className="btn btn=md btn-dark mb-3"
            >
              View Updated Article
            </Link>
          </center>
        </div>
      </div>
    </Base>
  );
};

export default UpdateNewsPage;
