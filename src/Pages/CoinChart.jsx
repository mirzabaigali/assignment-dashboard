import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "./CryptoContext";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ coin }) => {
  const [coinData, setCoinData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  const fetchChart = async () => {
    const chart = await axios.get(HistoricalChart(coin.id, days, currency));
    setCoinData(chart?.data?.prices);
  };
  useEffect(() => {
    fetchChart();
  }, [currency, days]);

  const handleClick = (e) => {
    setDays(e.target.value);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {!coinData ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <>
              <Line
                data={{
                  labels: coinData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: coinData.map((coin) => coin[1].toFixed(2)),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div className="col-md-12 mt-3 d-flex justify-content-evenly">
                <button
                  className="btn btn-outline-warning"
                  onClick={handleClick}
                  value="1"
                >
                  24 Hours
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleClick}
                  value="30"
                >
                  30 Days
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleClick}
                  value="90"
                >
                  3 Months
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleClick}
                  value="365"
                >
                  1 Year
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinChart;
