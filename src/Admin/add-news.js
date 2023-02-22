import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user-auth/index";
import { getAllCategories, createNews } from "./helper/admin-api-calls";

const AddNews = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    summary: "",
    description: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
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
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("CATE:", categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createNews(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            summary: "",
            description: "",
            photo: "",
            category: "",
            loading: false,
            createdProduct: data.name,
            getaRedirect: true,
          });
        }
      })
      .catch(console.log("sign in required ! failed"));
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div
          className="col-md-6 offset-sm-3 text-center alert alert-danger mt-3"
          style={{ display: error ? " " : "none" }}
        >
          <h4>
            {error} <br></br> Upload news was failed...!!!
          </h4>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div
          className="col-md-6 offset-sm-3 text-center alert alert-success mt-3"
          style={{ display: createdProduct ? " " : "none" }}
        >
          <h4>{createdProduct} News created successfully..</h4>
        </div>
      </div>
    );
  };

  const createNewsForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success d-grid py-2">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("summary")}
          name="photo"
          className="form-control"
          placeholder="Summary"
          value={summary}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          style={{ height: "400px" }}
          className="form-control"
          placeholder="Short description about the news"
          value={description}
        />
      </div>

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

      <div className="mt-4 d-grid mb-3">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success rounded-pill"
        >
          Upload News
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="THE NEWS"
      description="news creation section"
      className="container bg-success p-4"
    >
      <Link to="/admin/dashboard" className="btn btn=md btn-dark mb-3">
        Back to Home View
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {errorMessage()}
          {successMessage()}
          {createNewsForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddNews;
