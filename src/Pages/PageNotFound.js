import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="page-not-found__content">
        <h1 className="page-not-found__title">404 - Page Not Found</h1>
        <Link className="page-not-found__link" to="/">
          Back to Site
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
