import { useState, useContext, useEffect } from "react";
import { menu, close, logo } from "../assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../actions/auth";

const navbar = ({ isAuthenticated, logout, username, userImage }) => {
  const [toggle, setToggle] = useState(false);
  const [fix, setFix] = useState(false);
  const [auth, setAuth] = useState(null);

  function setFixed() {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener("scroll", setFixed);
  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  if (auth === null) {
    return <div></div>;
  }
  return (
    <nav className="bg-grey w-full h-[100px] fixed border-b-2 border-lightgrey z-50 flex items-center px-12">
      <div id="mobile">
        <img
          src={toggle ? close : menu}
          className="w-[28px] h-[28px] object-contain mr-4"
          onClick={() => setToggle((prev) => !prev)}
        />
      </div>
      <a className="text-[32px] flex flex-row place-items-center text-white font-semibold pr-[40px]">
        <img
          src={logo}
          className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] align-middle"
        />
        <h1 className="hidden sm:flex">Pxlblock</h1>
      </a>
      <ul
        id="navbar"
        className={
          toggle ? "#navbar active space-x-12 mr-8" : "#navbar space-x-8 mr-8"
        }
      >
        <li>
          <Link
            to="/"
            className="border-b-2 border-transparent hover:border-white pb-1"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/discover"
            className="border-b-2 border-transparent hover:border-white pb-1"
          >
            Discover
          </Link>
        </li>
        <li>
          <Link
            to="/hire"
            className="border-b-2 border-transparent hover:border-white pb-1"
          >
            Hire
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="border-b-2 border-transparent hover:border-white pb-1"
          >
            Jobs
          </Link>
        </li>
      </ul>
      <form action="/search" method="get" style={{ margin: "0 auto" }}>
        <input
          type="text"
          id="search"
          name="q"
          placeholder="Search..."
          className="bg-primary w-[100%] h-[32px] hidden md:flex text-white justify-center outline-none rounded-full px-4"
        />
      </form>
      <ul
        className="flex flex-row space-x-8 text-[16px] sm:pl-[40px] items-center justify-right font-medium list-none"
        style={{ marginLeft: "auto" }}
      >
        <li>
          <button className="btn__gradient">
            <a href="">Create</a>
          </button>
        </li>
        <li>
          <a href="">
            <i className="fa-solid text-[20px] text-white fa-envelope"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-solid fa-bell text-[20px] text-white"></i>
          </a>
        </li>
        <li>
          {auth ? (
            <div id="pfp" className="w-[40px] h-[40px] rounded-full">
              <Link to={`/${username}`}>
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={`http://localhost:8000/${userImage}`}
                  alt="profile picture"
                />
              </Link>
              <div
                id="dropdown"
                className="hidden sm:hidden mx-4 text-white text-[16px] p-4 absolute right-0 w-[200px] h-[200px] bg-lightgrey"
              >
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/">Edit Availability</Link>
                  </li>
                  <li>
                    <p
                      onClick={logout}
                      href="/login"
                      className="cursor-pointer"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn__gradient">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  userImage: state.auth.userImage,
});

export default connect(mapStateToProps, { logout })(navbar);
