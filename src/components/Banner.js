import React from "react";
import "./Banner.css";
import Carousel from "../Pages/Carousel";
import CoinsTable from "../Pages/CoinsTable";

const Banner = () => {
  return (
    <>
      <div className="container-fluid banner">
        <div className="row">
          <div className="col-md-12 banner_text">
            <p className="fw-bold h1 text-light">Crypto Dashbord</p>
            <p className="text-capitalize text-secondary">
              get all the info regarding your favorite crypto currency
            </p>
            <Carousel />
          </div>
        </div>
      </div>
      <CoinsTable />
    </>
  );
};

export default Banner;
