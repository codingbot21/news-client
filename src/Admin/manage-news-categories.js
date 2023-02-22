import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user-auth/index";
import { deleteCategory, getAllCategories } from "./helper/admin-api-calls";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();
  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      title="THE NEWS"
      description="Manage News Categories here"
      className="container bg-success p-4"
    >
      <Link className="btn btn=md btn-dark mb-3" to={`/admin/dashboard`}>
        <span className="">Back to Menu</span>
      </Link>
      <div className="bg-dark text-white rounded">
        <div className="col-12 mt-3 py-3">
          <h2 className="text-center my-3">All News Categories</h2>
          <div className="container p-3">
            <table border="1" width="100%">
              <tr>
                <th> Index</th>
                <th> Name</th>
                <th> Update</th>
                <th> Delete</th>
              </tr>
              {categories.map((category, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                    <Link
                        className="btn btn-success"
                        to={`/update/news-category/${category._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                    <button
                        onClick={() => {
                            deleteThisCategory(category._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
