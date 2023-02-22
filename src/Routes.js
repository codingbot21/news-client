import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// home page
import Home from "./Admin/Home";

// auth
import Signin from "./user/Signin";
import Signup from "./user/Signup";

// dashboards
import AdminRoutes from "./user-auth/AdminRoutes";
import ReaderRoutes from "./user-auth/ReaderRoutes";
import UserRoutes from "./user-auth/UserRoutes";
import AdminDashBoard from "./user/AdminDashBoard";

/**
 * Admin
 * */
// category
import AddCategory from "./Admin/add-news-category";
import ManageCategories from "./Admin/manage-news-categories";
import UpdateCategory from "./Admin/update-news-category";
// news
import AddNews from "./Admin/add-news";
import ManageNews from "./Admin/manage-news";
import UpdateNews from "./Admin/update-news";
// other
import AdminReadMore from "./Admin/ReadMore";

/**
 * Reader
 */
import ReaderHome from "./Reader/Home";
import ReaderReadMore from "./Reader/ReadMore";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes path="/user/dashboard" exact component={Home} />
        <AdminRoutes
          path="/create/news-category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/manage/news-category"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/update/news-category/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoutes path="/create/news" exact component={AddNews} />
        <AdminRoutes path="/manage/news" exact component={ManageNews} />
        <AdminRoutes path="/update/news/:newsId" exact component={UpdateNews} />
        <AdminRoutes
          path="/admin/readmore/:newsId"
          exact
          component={AdminReadMore}
        />
        <ReaderRoutes path="/reader/home" exact component={ReaderHome} />
        <ReaderRoutes path="/home" exact component={ReaderHome} />
        <Route path="/reader-in/home" exact component={ReaderHome} />
        <UserRoutes
          path="/reader/readmore/:newsId"
          exact
          component={ReaderReadMore}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AllRoutes;
