import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CryptoState } from "../Pages/CryptoContext";
import { auth } from "../Pages/firebase";

const Profile = () => {
  const { user } = CryptoState();
  const [alert, setAlert] = useState(false);
  const logout = () => {
    setAlert(true);
    toast.success("Successfully Logout");
    signOut(auth);
  };

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Profile
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            WELCOME ${user.email}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-center">
          {user.photoURL === null ? (
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small/man-avatar-icon-free-vector.jpg"
              alt={user.displayName || user.email}
            />
          ) : (
            <img
              src={user.photoURL}
              class="rounded-circle"
              style={{ width: "150px" }}
              alt={user.displayName || user.email}
            />
          )}
          <p>{user.displayName || user.email}</p>

          <button className="btn btn-outline-info" onClick={logout}>
            Logout
          </button>
          {alert && <ToastContainer />}
        </div>
      </div>
    </>
  );
};

export default Profile;
