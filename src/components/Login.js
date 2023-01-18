import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CryptoState } from "../Pages/CryptoContext";
import { auth } from "../Pages/firebase";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const { user } = CryptoState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      setErr(true);
      toast.warning("please fill all the fields");
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      setErr(true);
      toast.success(`Login Suceessful. welcome ${result.user.email} `);
      navigate("/home");
    } catch (error) {
      setErr(true);
      toast.error(error.message);
    }
  };
  const googleProvider = new GoogleAuthProvider(auth);
  const signWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setErr(true);
      toast.success(
        `SignUp Successfull Welcome ${user.displayName || user.email}`
      );
    });
  };

  return (
    <div className="loginForm">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button className="mt-2" type="submit">
            Log In
          </button>
        </form>
        <Link to="/Register">
          <button className="link-btn">
            Don't have an account? Register here.
          </button>
        </Link>
        <span>OR</span>
        <GoogleButton style={{ width: "100%" }} onClick={signWithGoogle} />
      </div>
      {err ? <ToastContainer /> : ""}
    </div>
  );
};

export default Login;
