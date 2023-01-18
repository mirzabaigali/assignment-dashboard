import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <crypto.Provider value={{ currency, symbol, setCurrency, user }}>
      {children}
    </crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto);
};
