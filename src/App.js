import "./App.css";
import Header from "../src/components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
