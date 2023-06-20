import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "./Images";
import ProjectDetails from "./ProjectDetails";
import { close } from "../assets";

const Project = ({ stats }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowDetails(true);
    const newPath = `/project/${stats.username}/${stats.id}`;
    window.history.pushState("", "", newPath);
    console.log(newPath);
  };

  const handleClose = () => {
    setShowDetails(false);
    window.history.pushState(null, "New Page Title", "/");
  };

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="text-white">
      <div className="project__card relative">
        <div onClick={handleClick} className="project__card cursor-pointer">
          <div className="w-[100%] h-[100%]">
            <img
              src={`http://127.0.0.1:8000${stats.projectImage}`}
              alt="your image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="img__overlay text-white sm:p-4 p-2">
            <h1 className="font-bold text-[100%]  w-[80%]">
              {stats.projectName}
            </h1>
            <ul className="list-none stats__grid text-inline font-medium sm:text-[14px] text-[80%]">
              <li>
                <div
                  className="hover:underline cursor-pointer"
                  onClick={() => (window.location.href = `/${stats.username}`)}
                >
                  {stats.name}
                </div>
              </li>
              <li className="text-right">
                <i className="fa-sharp fa-solid fa-thumbs-up fa-sm pr-1">
                  {"  " + stats.likes.length}
                </i>
              </li>
              <li className="text-right">
                <i className="fa-sharp fa-solid fa-eye fa-sm pr-1">
                  {stats.views}
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showDetails && (
        <div>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-translucent z-50 overflow-auto">
            <a
              className="hidden sm:flex cursor-pointer z-[50] fixed top-0 right-0 max-w-[1300px] m-6 bg-lightgrey p-2 rounded-full"
              onClick={() => handleClose()}
            >
              <img src={close} />
            </a>
            <div className="max-w-[1300px] absolute top-0">
              <ProjectDetails
                username={stats.username}
                id={stats.id}
                className=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
