import React, { useState, useEffect } from "react";
import "../styles.css";

import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllNews } from "../Admin/helper/admin-api-calls";
import NewsHomeImageHelper from "../core/helper/NewsHomeImageHelper";
import { isAutheticated } from "../user-auth";

export default function Home() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);

  const loadAllNews = () => {
    getAllNews().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNews(data);
      }
    });
  };

  useEffect(() => {
    loadAllNews();
  }, []);

  return (
    <Base title="The News" description="Truth First">
      <div className="row text-center">
        <h1 className="text-white">Hot News</h1>

        <div className="container p-3">
          {news.map((news, index) => {
            return (
              <>
                <div class="card mb-3">
                  <div class="card-body">
                    <NewsHomeImageHelper className="mr-3" news={news} />
                    <br />
                    <br />
                    <h5
                      class="card-title"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {news.name}
                    </h5>
                    <p class="card-text" style={{ color: "black" }}>
                      {news.summary}
                    </p>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>

                    {isAutheticated() && (
                      <Link
                        className="btn btn-success"
                        to={`/reader/readmore/${news._id}`}
                      >
                        <span className="">Read More</span>
                      </Link>
                    )}
                    {!isAutheticated() && (
                      <Link className="btn btn-success" to={`/signin`}>
                        <span className="">Read More</span>
                      </Link>
                    )}
                  </div>
                </div>
                <tr>
                  <br />
                </tr>
              </>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
