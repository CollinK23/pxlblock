import React, { useEffect, useState, useContext } from "react";
import Project from "./Project";
import { handleFollow } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const User = ({
  username,
  isAuthenticated,
  currUser,
  handleFollow,
  userId,
}) => {
  let [info, setInfo] = useState("");
  let [following, setFollowing] = useState(false);
  let [follow, setFollow] = useState("");
  let [followers, setFollowers] = useState("");
  const [followButtonText, setFollowButtonText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currUser) {
      getInfo();
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

  let getInfo = async () => {
    let response = await fetch(`/api/profile/${username}`);
    let data = await response.json();
    setFollowers(data.profiles.followers.length - 1);
    setInfo(data);
    if (currUser && data.profiles.followers.includes(userId)) {
      setFollowing(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    handleFollow(follow, username);
    setFollowing((prev) => !prev);

    if (following) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-[100px] bg-primary">
      <div className="flex justify-center items-center">
        <div className="account__grid mx-[20px]">
          <div className=" sticky w-[100%] h-[100%] bg-grey items-center flex flex-col p-8">
            <div className="w-[150px] h-[150px]">
              <img
                src={`http://127.0.0.1:8000${info.profiles.userImage}`}
                alt="your image"
                className="w-full h-full object-cover rounded-full outline outline-grey outline-[4px]"
              />
            </div>
            <h1 className="text-white pt-2 text-[30px] font-semibold">
              {info.profiles.name}
            </h1>
            <h1 className="text-white text-[18px] font-medium">
              {info.profiles.field}
            </h1>
            <h1 className="text-gray-600 py-2 text-[16px] font-medium">
              <i className="fa-solid fa-location-dot pr-2"></i>
              {info.profiles.location}
            </h1>
            <h1 className="text-white text-[16px] font-medium">Skills:</h1>
            <div className="flex flex-wrap">
              {info.profiles.skills.map((stats, index) => (
                <h1 key={index} className="skill__gradient text-[12px] m-1">
                  {stats}
                </h1>
              ))}
            </div>
            <p className="grid grid-cols-2 text-white py-2 text-[16px] w-[100%] font-medium">
              <div>Views</div>
              <div className="text-right">{info.profiles.views}</div>
              <div>Likes</div>
              <div className="text-right">
                {(() => {
                  let totalLikes = 0;
                  for (let i = 0; i < info.projects.length; i++) {
                    totalLikes += info.projects[i].likes.length;
                  }

                  return totalLikes;
                })()}
              </div>
              <div>Followers</div>
              <div className="text-right">{followers}</div>
              <div>Following</div>
              <div className="text-right">
                {info.profiles.follows.length - 1}
              </div>
            </p>
            <a className="btn__gradient w-[100%] text-center my-2">Hire Me</a>
            {isAuthenticated && currUser == username ? null : (
              <a
                className="btn__gradient w-[100%] text-center cursor-pointer"
                onClick={(e) => onClick(e)}
              >
                {followButtonText}
              </a>
            )}
          </div>
          <div className="project__grid2 justify-center">
            {info.projects.map((stats, index) => (
              <Project key={index} stats={stats} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currUser: state.auth.username,
  userId: state.auth.userId,
});
export default connect(mapStateToProps, { handleFollow })(User);
