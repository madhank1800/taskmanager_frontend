import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand " href="/home">
            <i className="bi bi-book-half"></i> Task Manager
          </a>
          <form className="d-flex" role="search">
            <button
              className="btn btn-success btn-sm"
              type="submit"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-in-right"> Logout</i>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
