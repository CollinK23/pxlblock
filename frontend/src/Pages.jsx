import React, { useEffect } from "react";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import {
  Navbar,
  Grid,
  Jobs,
  Discover,
  Hire,
  User,
  Login,
  Register,
  ProjectDetails,
  Create,
} from "./components";
import { connect } from "react-redux";
import { checkAuth } from "./actions/auth";

const Pages = ({ checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, []);

  // const location = useLocation();
  // const showNavbar = !location.pathname.startsWith("/project");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/following" element={<Grid />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/:username/:id/*" element={<UserProject />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
};

const UserProfile = () => {
  const { username } = useParams();

  return <User username={username} />;
};

const UserProject = () => {
  const { username, id } = useParams();

  return <ProjectDetails username={username} id={id} />;
};

export default connect(null, { checkAuth })(Pages);
