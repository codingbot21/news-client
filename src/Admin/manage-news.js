import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user-auth/index";
import { deleteNews, getAllNews } from "./helper/admin-api-calls";
import ImageHelper from "../core/helper/ImageHelper";

const ManageNews = () => {
  const [news, setNews] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getAllNews().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setNews(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisNews = (newsId) => {
    deleteNews(newsId, user._id, token).then((data) => {
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
      description="Manage news here"
      className="container bg-success p-4"
    >
      <Link className="btn btn=md btn-dark mb-3" to={`/admin/dashboard`}>
        <span className="">Back to Menu</span>
      </Link>
      <div className="bg-dark text-white rounded">
        <div className="col-12 mt-3 py-3">
          <h2 className="text-center my-3">All Live News Now</h2>
          <div className="container p-3">
            <table border="1" width="100%">
              <tr>
                <th> Index</th>
                <th> Image</th>
                <th> Name</th>
                <th> Description</th>
                <th> Update</th>
                <th> Delete</th>
              </tr>
              {news.map((news, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <ImageHelper className="mr-3" news={news} />
                    </td>
                    <td>{news.name}</td>
                    <td>{news.description}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/update/news/${news._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteThisNews(news._id);
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

export default ManageNews;
