import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProjectDetails = ({ username, id }) => {
  const [info, setInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const path = `/api/profile/${username}/${id}`;

  useEffect(() => {
    getInfo(path);
  }, [path]);

  const getInfo = async (path) => {
    try {
      const response = await fetch(path);
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-primary py-[100px]">
      <div className="text-white flex row w-[100%] space-x-4">
        <div id="pfp" className="w-[50px] h-[50px] rounded-full">
          <Link to={`/${username}`}>
            <img
              className="w-full h-full object-cover rounded-full"
              src={`http://localhost:8000/${info.profile.userImage}`}
              alt="profile picture"
            />
          </Link>
        </div>
        <div>
          <h1>{info.profile.name}</h1>
          <Link to={`/${username}`} className="hover:underline">
            {info.profile.username}
          </Link>
        </div>
      </div>
      {info.project.map((project, index) => (
        <img
          key={project.id}
          src={`http://127.0.0.1:8000${project.image}`}
          alt={`picture${index}`}
          className="sm:px-[100px] sm:py-[25px] px-8 py-2"
          onClick={() => handleClick(project.image)}
        />
      ))}

      {selectedImage && (
        <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-translucent z-50">
          <div
            className="fixed inset-0 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={`http://127.0.0.1:8000${selectedImage}`}
              alt="fullscreen"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetails;
