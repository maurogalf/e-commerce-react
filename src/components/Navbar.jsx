import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear("token");
    navigate("/login");
  };
  const handleClick = () => setClick(!click);

  useEffect(() => {}, [click]);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid justify-content-between">
        <div>
          <h2 className="text-white">
            Welcome <span id="user">{user}</span>
          </h2>
        </div>
        <div>
          <Link
            onClick={handleClick}
            className={`btn btn-outline-success me-2 ${
              window.location.pathname === "/productos" && "disabled"
            }`}
            to="/productos"
          >
            Products
          </Link>
          <Link
            onClick={handleClick}
            to="/cart"
            className={`btn btn-outline-success me-2 ${
              window.location.pathname === "/cart" && "disabled"
            }`}
          >
            Cart
          </Link>
          <Link
            onClick={handleClick}
            className={`btn btn-outline-success me-2 ${
              window.location.pathname === "/profile" && "disabled"
            }`}
            to="/profile"
          >
            Profile
          </Link>
          <button
            onClick={handleLogOut}
            className="btn btn-outline-danger me-2"
          >
            LogOut
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
