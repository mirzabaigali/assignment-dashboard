import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Pages/firebase";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPAss] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      setErr(true);
      toast.error("password do not match");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      setErr(true);
      toast.success(`welcome ${result.user.email}`);
    } catch (error) {
      setErr(true);
      toast.error(error.message);
    }
  };

  return (
    <div className="loginForm">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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
          <label htmlFor="name">Confirm password</label>
          <input
            type="password"
            value={confirmPass}
            name="name"
            onChange={(e) => setConfirmPAss(e.target.value)}
            id="name"
          />
          <button className="mt-2" type="submit">
            submit
          </button>
        </form>
        <Link to="/Login">
          <button className="link-btn">
            Already have an account? Login here.
          </button>
        </Link>
        {err ? <ToastContainer /> : ""}
      </div>
    </div>
  );
};
export default Register;
