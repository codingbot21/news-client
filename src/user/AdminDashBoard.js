import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../user-auth";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email},
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white text-center">
          Manage News Feed
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
              <Link to="/create/news-category" className="nav-link text-success">Create News Category</Link>
          </li>
          <li className="list-group-item">
              <Link to="/manage/news-category" className="nav-link text-success">Manage Categories</Link>
          </li>
          <li className="list-group-item">
              <Link to="/create/news" className="nav-link text-success">Add a news</Link>
          </li>
          <li className="list-group-item">
              <Link to="/manage/news" className="nav-link text-success">Manage News</Link>
          </li>

        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white text-center">
          Admin Infomation
        </h4>
        <ul className="list-group">
            <li className="list-group-item ">
                <h5><span className="badge bg-success text-white mr-5"> Name: </span> {name} </h5>
            </li>
            <li className="list-group-item">
                <h5><span className="badge bg-success text-white mr-2"> Email: </span> {email}</h5>
            </li>
            <li className="list-group-item">
                <span className="badge bg-danger">Admin Management Panel</span>
            </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="THE NEWS"
      description="ADMIN DASHBOARD"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
