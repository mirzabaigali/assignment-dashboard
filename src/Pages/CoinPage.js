import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinChart from "./CoinChart";
import { CryptoState } from "./CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(true);
  const fetchSingleCoin = async () => {
    try {
      const data = await axios.get(SingleCoin(id));
      setCoin(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleCoin();
  }, [id]);

  return (
    <>
      {loading ? (
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div
                className="spinner-grow text-primary"
                style={{ width: "4rem", height: "4rem" }}
                role="status"
              >
                <span className="visually-hidden"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-3 d-flex flex-column align-items-center"
              style={{ borderRight: "2px solid grey" }}
            >
              <img
                src={coin?.image?.large}
                alt={coin?.image?.name}
                className="img-fluid"
              />
              <h1 className="text-light">{coin?.name}</h1>
              <p className="text-warning" dangerouslySetInnerHTML={{ __html: coin?.description.ro.substring(0,500) }}>
                {/* {coin?.description?.ro.substring(0, 150)} */}
              </p>
              <h3 className="text-light">Rank:{coin?.market_cap_rank} </h3>
              <h6 className="text-light">
                CurrentPrice:{symbol}{" "}
                {coin?.market_data.current_price[currency.toLowerCase()]}
              </h6>
              <h6 className="text-light">
                Market Cap: {symbol}{" "}
                {coin?.market_data.market_cap[currency.toLowerCase()]}
              </h6>
            </div >
            <div className="col-md-9">
              <CoinChart coin={coin} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinPage;
