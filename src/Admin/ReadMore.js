import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import NewsHomeImageHelper from "../core/helper/NewsHomeImageHelper";

import { getNews } from "../Admin/helper/admin-api-calls";
import { isAutheticated } from "../user-auth/index";

const ReadMore = ({ match }) => {
  const { user, token } = isAutheticated();

  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);

  const [values, setValues] = useState({
    name: "",
    summary: "",
    description: "",
    photo: "",
    loading: false,
    createdNews: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    summary,
    description,
    loading,
    createdNews,
    getaRedirect,
    formData,
  } = values;

  const loadNews = (newsId) => {
    getNews(newsId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNews(data);
      }
    });
  };

  const preload = (newsId) => {
    getNews(newsId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          summary: data.summary,
          description: data.description,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    loadNews(match.params.newsId);
  }, []);

  return (
    <Base title="THE NEWS" description="Truth First">
      <Link to="/" className="btn btn=md btn-success mb-3">
        Back
      </Link>
      <div>
        <div>
          <div class="card mb-3">
            <div class="card-body">
              <br />
              <br />
              <center>
                <h2
                  class="card-title"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {news.name}
                </h2>
              </center>
              <br />
              <br />
              <NewsHomeImageHelper className="mr-3" news={news} />
              <br />
              <br />

              <p class="card-text" style={{ color: "black" }}>
                {news.description}
              </p>
            </div>
            <center>
              <Link className="btn btn-success" to={`/update/news/${news._id}`}>
                <span className="">Edit this news</span>
              </Link>{" "}
              <br /> <br />
            </center>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ReadMore;
