import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../user-auth";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div className="container">
    <ul className="nav nav-tabs bg-dark">
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <Fragment>
          <li className="nav-item text-white nav-link">Welcome to THE NEWS</li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/reader/home")}
              className="nav-link"
              to="/reader-in/home"
            >
              Home
            </Link>
          </li>
        </Fragment>
      )}
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>

    <ul className="nav nav-tabs bg-dark">
      {isAutheticated() && isAutheticated().user.role === 1 && (
        <Fragment>
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Dash Board
            </Link>
          </li>
        </Fragment>
      )}

      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/reader/home")}
              className="nav-link"
              to="/home"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              SignUp
            </Link>
          </li>

          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              SignIn
            </Link>
          </li>
        </Fragment>
      )}

      {isAutheticated() && isAutheticated().user.role === 1 && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
