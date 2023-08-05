import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleFollow, handleLike } from "../actions/auth";
import { close } from "../assets";

const ProjectDetails = ({
  username,
  id,
  isAuthenticated,
  currUser,
  handleFollow,
  userId,
  handleLike,
}) => {
  const [info, setInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const path = `/api/profile/${username}/${id}`;
  let [following, setFollowing] = useState(false);
  let [follow, setFollow] = useState("");
  const [followButtonText, setFollowButtonText] = useState("");

  let [liked, setLiked] = useState(false);
  let [like, setLike] = useState("");

  useEffect(() => {
    getInfo(path);
  }, [path]);

  useEffect(() => {
    if (currUser) {
      getInfo(path);
    }
  }, [currUser]);

  useEffect(() => {
    setFollowButtonText(following ? "Following" : "Follow");

    if (following) {
      setFollow("unfollow");
    } else {
      setFollow("follow");
    }
  }, [following]);

  useEffect(() => {
    if (liked) {
      setLike("unlike");
    } else {
      setLike("like");
    }
  }, [liked]);

  const getInfo = async (path) => {
    try {
      const response = await fetch(path);
      const data = await response.json();
      setInfo(data);
      if (currUser && data.profile.followers.includes(userId)) {
        setFollowing(true);
      }
      if (currUser && data.projectInfo.likes.includes(userId)) {
        setLiked(true);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  const onClick = (e) => {
    e.preventDefault();
    handleFollow(follow, username);
    setFollowing((prev) => !prev);
  };

  const onLike = (e) => {
    e.preventDefault();
    handleLike(like, id);
    setLiked((prev) => !prev);
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-primary py-[100px] pt-[150px]">
      <div className="text-white flex row w-[100%] items-center space-x-4 sm:px-[100px] px-8">
        <div id="pfp" className="w-[50px] h-[50px] rounded-full">
          <Link to={`/${username}`}>
            <img
              className="w-full h-full object-cover rounded-full"
              src={`http://localhost:8000/${info.profile.userImage}`}
              alt="profile picture"
            />
          </Link>
        </div>
        <div className="flex-grow">
          <h1 className="font-semibold text-[18px]">
            {info.projectInfo.title}
          </h1>
          <div className="flex row space-x-4">
            <Link to={`/${username}`} className="hover:underline">
              {info.profile.username}
            </Link>
            <h1>•</h1>
            {isAuthenticated && currUser == username ? null : (
              <h1
                onClick={(e) => onClick(e)}
                className="cursor-pointer hover:underline"
              >
                {followButtonText}
              </h1>
            )}
          </div>
        </div>
        <div className="sm:block hidden btn__white">
          <i class="fa-solid fa-bookmark fa-sm pr-1"></i>
        </div>
        <div
          className="sm:block hidden btn__gradient"
          onClick={(e) => onLike(e)}
        >
          {isAuthenticated && liked ? (
            info.projectInfo.likes.length
          ) : (
            <i class="fa-solid fa-heart fa-sm pr-1"></i>
          )}
        </div>
      </div>
      {info.project.map((project, index) => (
        <img
          key={project.id}
          src={`http://127.0.0.1:8000${project.image}`}
          alt={`picture${index}`}
          className="sm:px-[100px] sm:py-[25px] px-8 py-2 w-[100%]"
          onClick={() => handleClick(project.image)}
        />
      ))}

      {selectedImage && (
        <div className="fixed top-0 left-0  w-[100%] h-[100%] bg-black z-50">
          <a
            className="hidden sm:flex cursor-pointer z-[50] fixed top-0 right-0 max-w-[1300px] m-6 bg-lightgrey p-2 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <img src={close} />
          </a>
          <div className="fixed inset-0 flex items-center justify-center">
            <img
              src={`http://127.0.0.1:8000${selectedImage}`}
              alt="fullscreen"
              className="max-w-[90%] max-h-[90%]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currUser: state.auth.username,
  userId: state.auth.userId,
});
export default connect(mapStateToProps, { handleFollow, handleLike })(
  ProjectDetails
);
