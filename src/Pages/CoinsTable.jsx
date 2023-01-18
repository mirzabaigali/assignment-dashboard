import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "./CryptoContext";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currency, symbol } = CryptoState();

  const fetchCoinList = async () => {
    const data = await axios.get(CoinList(currency));
    setCoins(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  const comas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center text-light m-3 display-6 fw-light text-capitalize">
                please click on the currency icon to go to the chart page
              </p>
            </div>

            <div className="col-md-12">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-striped table-hover table-dark table-responsive ">
                      <thead className="table-warning text-black">
                        <tr>
                          <th scope="col">Coin</th>
                          <th scope="col">Price</th>
                          <th scope="col">24h Change</th>
                          <th scope="col">Market Cap</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coins.map((item, index) => {
                          let profit = item?.price_change_24h > 0 && "+";
                          return (
                            <tr key={index}>
                              <th scope="row">
                                <Link
                                  to={`/coins/${item.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  <img
                                    src={item?.image}
                                    alt={item?.name}
                                    style={{ width: "50px", height: "50px" }}
                                  />{" "}
                                  <span>{item?.symbol}</span>{" "}
                                  <span>{item?.name}</span>
                                </Link>
                              </th>
                              <td>
                                <Link
                                  to={`/coins/${item.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  {symbol}{" "}
                                  {comas(item?.current_price.toFixed(2))}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/coins/${item.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: profit ? "green" : "red",
                                  }}
                                >
                                  {profit}
                                  {item?.price_change_24h.toFixed(2)}
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/coins/${item.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "wheat",
                                  }}
                                >
                                  {symbol}{" "}
                                  {comas(
                                    item?.market_cap.toString().slice(0, -6)
                                  )}
                                  M
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinsTable;
