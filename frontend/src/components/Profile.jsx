import React from "react";

const Profile = ({ stats }) => {
  return (
    <div className="w-[450px] h-[300px] bg-grey border-b-2 border-lightgrey relative hover:bg-lightgrey transition duration-300 ease-in-out">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[75px] h-[75px] mt-10">
        <img
          src={stats.userImage}
          alt="your image"
          className="w-full h-full object-cover rounded-[10px] outline outline-grey outline-[4px]"
        />
      </div>
      <div className="w-[100%] h-[100px]">
        <div className="profile__grid">
          {stats.work?.map((image, index) => (
            <img src={image} className="w-[150px] h-[100%] object-cover" />
          ))}
        </div>
      </div>
      <div className="w-[100%] p-4 mt-2 text-center absolute ">
        <h1 className="text-white text-[18px] font-semibold">{stats.name}</h1>
        <ul className="flex flex-row justify-center space-x-4 m-4">
          {stats.jobs?.map((job, index) => (
            <li className="text-white text-[14px] font small skill__gradient p-4">
              <a>{job}</a>
            </li>
          ))}
        </ul>
        <div className="follow__grid text-white text-[16px] text-center font-medium">
          <h1>Likes</h1>
          <h1>Views</h1>
          <h1>Followers</h1>
          <h1>{stats.likes}</h1>
          <h1>{stats.views}</h1>
          <h1>{stats.followers}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
