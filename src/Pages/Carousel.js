import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../Pages/CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = CryptoState();
  const fetchTrending = async () => {
    try {
      const data = await axios.get(TrendingCoins(currency));
      setTrending(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const comas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const items = trending.map((item) => {
    return (
      <Link to={`/coins/${item.id}`} style={{ textDecoration: "none" }}>
        <img
          src={item?.image}
          alt={item?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <p>
          {item?.symbol}
          &nbsp;
          <span
            style={
              item?.price_change_percentage_24h >= 0
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {item?.price_change_percentage_24h >= 0 && "+"}{" "}
            {item?.price_change_percentage_24h_in_currency.toFixed(2)}% {}
          </span>
        </p>
        <p style={{ fontSize: 22, fontWeight: 500, color: "white" }}>
          {symbol} <span>{comas(item?.current_price.toFixed(2))}</span>
        </p>
      </Link>
    );
  });

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div
          className="d-flex align-items-center"
          style={{ height: "50%", paddingTop: "20px" }}
        >
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
          />
        </div>
      )}
    </>
  );
};

export default Carousel;
