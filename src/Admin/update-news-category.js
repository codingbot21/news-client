import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user-auth/index";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/admin-api-calls";

const UpdateNewsCategory = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    createdCategory:"",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    loading,
    error,
    createdCategory,
    getaRedirect,
    formData,
  } = values;


  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      //console.log('data here',data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  const goBack = () => {
    return (
      <Link className="btn btn=md btn-dark mb-3" to="/manage/news-category">
        {" "}
        Admin Home
      </Link>
    );
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  
  const handleChange = (name) => (event) => {
    // console.log('event',event);
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log('formData here', formData);
    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name,
          });
        }
      }
    );
   
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? " " : "none" }}
      >
        <h4>{error} created successfully..</h4>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? " " : "none" }}
      >
        <h4>{createdCategory} Updated successfully..</h4>
      </div>
    );
  };

  const UpdateNewsCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead mt-3 text-white text-center">Change The Category Name</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("name")}
            value={name}
            placeholder="Ex. Sports News"
          />
        </div>
        <div className="d-grid py-4">
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Update News Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="THE NEWS"
      description="Update news category name"
      className="container bg-success p-4 "
    >
      {goBack()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {successMessage()}
          {errorMessage()}
          {UpdateNewsCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateNewsCategory;
