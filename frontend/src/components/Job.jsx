import React from "react";

const Job = ({ stats, onClick }) => {
  return (
    <div
      className="w-[350px] h-[325px] bg-grey border-b-2 border-lightgrey relative hover:bg-lightgrey "
      onClick={onClick}
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[75px] h-[75px] mt-10">
        <img
          src={stats.userImage}
          alt="your image"
          className="w-full h-full object-cover rounded-[10px] outline outline-grey outline-[4px]"
        />
      </div>
      <div className="w-[100%] h-[100px]">
        <img
          src={stats.userBanner}
          alt="your image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[100%] p-4 mt-2 text-center absolute ">
        <h1 className="text-white text-[18px] font-semibold">{stats.name}</h1>
        <h1 className="text-gray-500">
          <i class="fa-solid fa-location-dot pr-2"></i>
          {stats.location}
        </h1>
        <h1 className="text-white text-[22px] font-semibold mt-2">
          {stats.jobTitle}
        </h1>
        <p className="text-gray-500 w-[100%] text-[100%]">
          {stats.description}
        </p>
      </div>
    </div>
  );
};

export default Job;
