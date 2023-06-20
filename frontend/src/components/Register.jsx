import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import CSRFToken from "./CSRFToken";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { username, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      register(username, email, password, re_password);
      setFormSubmitted(true);
    }
  };

  if (isAuthenticated) {
    navigate("/");
  } else if (formSubmitted) {
    navigate("/login");
  }

  return (
    <section className={`grid__bg pt-[100px] h-[100vh]`}>
      <div className="m-8 flex justify-center">
        <div className="bg-grey max-w-[600px] w-[100%] h-[100%] p-8">
          <div className="text-white text-[36px] font-semibold">Register</div>
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
              placeholder="Username*"
              onChange={(e) => onChange(e)}
              value={username}
              required
            />
            <label for="email" className="text-white text-[16px] font-medium">
              Email:
            </label>
            <input
              type="email"
              className="bg-primary text-white p-2 my-2 w-[100%] outline-lightgrey"
              name="email"
              id="email"
              placeholder="Email*"
              onChange={(e) => onChange(e)}
              value={email}
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
              placeholder="Password*"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
              required
            />
            <label
              for="re_password"
              className="text-white text-[16px] font-medium"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              className="bg-primary text-white p-2 my-2 mb-4 w-[100%] outline-lightgrey"
              name="re_password"
              id="repass"
              placeholder="Confirm Password*"
              onChange={(e) => onChange(e)}
              value={re_password}
              minLength="6"
              required
            />
            <button
              type="submit"
              className="flex justify-center w-[100%] btn__gradient"
            >
              Register
            </button>
          </form>
          <a
            href="/login"
            className="flex justify-center text-white text-[16px] hover:text-purple"
          >
            Already have an account? Log in
          </a>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
