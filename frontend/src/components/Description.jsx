import React from "react";

const Description = ({ stats }) => {
  return (
    <div>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-grey max-w-[1300px] h-[100%] sm:w-[90%] w-[100%] mx-[auto] h-[100%] z-[10] py-[100px]">
        <div className="m-8 relative overflow-y-scroll h-[100%]">
          <div className="">
            <div className=" w-[50px] h-[50px] mb-4">
              <img
                src={stats.userImage}
                alt="your image"
                className="w-full h-full object-cover  outline outline-grey outline-[4px]"
              />
            </div>
            <h1 className="text-white font-medium text-[36px] leading-tight">
              {stats.jobTitle}
            </h1>
          </div>
          <h1 className="text-white font-medium">
            <br></br> {stats.jobType}
            <br></br> {stats.name} - {stats.location}
          </h1>
          <div className="my-8">
            <a className="btn__gradient">Apply</a>
          </div>
          <p
            className="text-white sm:w-[50%] leading-loose"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              overflowWrap: "break-word",
            }}
          >
            <span className="font-medium text-[24px]">About The Job:</span>
            <br></br> {stats.paragraph}
          </p>
        </div>
      </div>
      <div className=" fixed top-0 left-1/2 transform -translate-x-1/2 bg-translucent w-full h-screen z-[5]"></div>
    </div>
  );
};

export default Description;
