import React, { useState } from "react";
import { background } from "../assets";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import CSRFToken from "./CSRFToken";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <section className={`grid__bg pt-[100px] h-[100vh]`}>
      <div className="m-8 flex justify-center">
        <div className="bg-grey max-w-[600px] w-[100%] h-[100%] p-8">
          <div className="text-white text-[36px] font-semibold">Sign In</div>
          <form onSubmit={(e) => onSubmit(e)} className="py-4">
            <CSRFToken />
            <label for="user" className="text-white text-[16px] font-medium">
              Username:
            </label>
            <input
              type="text"
              className="bg-primary text-white p-2 my-2 w-[100%] outline-lightgrey"
              name="username"
              id="user"
              placeholder="Username"
              onChange={(e) => onChange(e)}
              value={username}
              required
            />
            <label
              for="password"
              className="text-white text-[16px] font-medium"
            >
              Password:
            </label>
            <input
              type="password"
              className="bg-primary text-white p-2 my-2 mb-4 w-[100%] outline-lightgrey"
              name="password"
              id="pass"
              placeholder="Password"
              onChange={(e) => onChange(e)}
              value={password}
              required
            />
            <button
              type="submit"
              className="flex justify-center w-[100%] btn__gradient"
            >
              Log In
            </button>
          </form>
          <a
            href="/register"
            className="flex justify-center text-white text-[16px] hover:text-purple"
          >
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
