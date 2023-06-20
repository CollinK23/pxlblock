import React from "react";
import Job from "./Job";
import Description from "./Description";
import { useState, useEffect } from "react";
import { fields, locations } from "../constants";
import { close } from "../assets";

const Jobs = () => {
  const [toggle, setToggle] = useState(false);
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All Creative Fields");
  const [selectedStats, setSelectedStats] = useState(null);
  const [closeDes, setClose] = useState(false);

  function handleJobClick(index) {
    setSelectedStats(index);
    setClose((prev) => !prev);
  }

  function handleClose() {
    setSelectedStats(null);
    setClose((prev) => !prev);
  }

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
  useEffect(() => {
    if (selectedStats) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedStats]);
  const userInfo = [
    {
      name: "Collin Kimball",
      userImage:
        "https://pbs.twimg.com/profile_images/1486601457738518528/d1hjrCvw_400x400.jpg",
      jobs: ["Freelance", "Full-Time"],
      skills: ["3D Art", "Graphic Design", "Illustration"],
      work: [
        "https://pbs.twimg.com/media/E7U6cq1VgAAkNVM?format=jpg&name=large",
        "https://pbs.twimg.com/media/E3YBER-VIAAcrYm?format=jpg&name=large",
        "https://pbs.twimg.com/media/E6SAawEVUAM93tX?format=jpg&name=4096x4096",
      ],
      likes: "5.7K",
      views: "45.7K",
      followers: "798",
    },
  ];

  const data = [
    {
      name: "Collin Kimball",
      userImage:
        "https://pbs.twimg.com/profile_images/1486601457738518528/d1hjrCvw_400x400.jpg",
      userBanner:
        "https://pbs.twimg.com/profile_banners/1107498540979253248/1640773146/1500x500",
      jobTitle: "Freelance Graphic Designer",
      jobType: "Freelance",
      location: "Remote",
      description:
        "We're looking for a talented graphic designer to join our team on a freelance basis.",
      paragraph:
        "APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs. APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs. APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs. APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs.",
      field: "Graphic Design",
    },
    {
      name: "Twitter",
      userImage:
        "https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg",
      userBanner:
        "https://pbs.twimg.com/profile_banners/783214/1646075315/1500x500",
      jobTitle: "Senior Graphic Designer",
      jobType: "Freelance",
      location: "San Francisco, CA",
      description:
        "We're looking for a talented graphic designer to join our team on a freelance basis.",
      paragraph:
        "APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs.",
      field: "3D Art",
    },
    {
      name: "Google",
      userImage:
        "https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg",
      userBanner:
        "https://pbs.twimg.com/profile_banners/20536157/1672956278/1500x500",
      jobTitle: "UI/UX Designer",
      jobType: "Freelance",
      location: "Remote",
      description:
        "We're looking for a talented graphic designer to join our team on a freelance basis.",
      paragraph:
        "APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview ----- We are seeking a talented Senior UX/UI Designer with branding skills and high attention to detail to join our team. As a Senior UX/UI Designer, you will be responsible for creating user-centered designs for various projects, mostly in eCommerce and web branding. You will collaborate with cross-functional teams, including project managers, developers, and stakeholders, to deliver exceptional design solutions that meet business goals and user needs.",
      field: "Illustration",
    },
    {
      name: "AMD",
      userImage:
        "https://pbs.twimg.com/profile_images/1534988679076368384/In8IVKDB_400x400.png",
      userBanner:
        "https://pbs.twimg.com/profile_banners/14861876/1657051724/1500x500",
      jobTitle: "Freelance Graphic Designer",
      jobType: "Freelance",
      location: "Remote",
      description:
        "We're looking for a talented graphic designer to join our team on a freelance basis.",
      paragraph: "APPLY ONLY IF YOU HAVE 3+ YEARS OF EXPERIENCE Job Overview.",
      field: "Motion Design",
    },
  ];
  return (
    <section className="bg-primary py-[100px]">
      <ul className="list-none flex flex-row text-[22px] cursor-pointer space-x-8 my-6 justify-center">
        <li>
          <a
            className={
              toggle
                ? "font-medium text-gray-600 border-b-[3px] border-transparent hover:border-gray-600 pb-2 transition duration-300 ease-in-out"
                : "font-semibold text-white border-b-[3px] pb-2"
            }
            onClick={() => {
              if (toggle !== false) {
                setToggle((prev) => !prev);
              }
            }}
          >
            Freelance
          </a>
        </li>
        <li>
          <a className="text-gray-600 cursor-default">|</a>
        </li>
        <li>
          <a
            className={
              toggle
                ? "font-semibold text-white border-b-[3px] pb-2"
                : "font-medium text-gray-600 border-b-[3px] border-transparent hover:border-gray-600 pb-2 transition duration-300 ease-in-out"
            }
            onClick={() => {
              if (toggle == false) {
                setToggle((prev) => !prev);
              }
            }}
          >
            Full-Time
          </a>
        </li>
      </ul>
      <div className="flex justify-center items-center mx-auto">
        <form action="/search" method="get">
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              name="q"
              placeholder="Job Title"
              className=" bg-grey max-w-[800px] w-[100%] h-[48px] outline-none text-white px-4"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
            />
            <select
              id="fields"
              name="fields"
              className="hidden sm:inline h-[48px] w-[100%] text-white bg-grey outline-none px-4 ml-2"
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
            >
              {fields.map((field, index) => (
                <option value={field} key={index}>
                  {field}
                </option>
              ))}
            </select>
            <select
              id="locations"
              name="locations"
              className="hidden sm:inline h-[48px] w-[100%] text-white bg-grey outline-none px-4 ml-2"
            >
              {locations.map((location, index) => (
                <option value={location} key={index}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="project__grid">
        {data.map((stats, index) => {
          if (
            (stats.jobTitle.includes(jobTitleFilter) ||
              stats.name.includes(jobTitleFilter)) &&
            (fieldFilter == "All Creative Fields" || stats.field == fieldFilter)
          ) {
            return (
              <div key={index}>
                <Job stats={stats} onClick={() => handleJobClick(index)} />
                {selectedStats == index && <Description stats={stats} />}
              </div>
            );
          }
          return null;
        })}
        {selectedStats != null && (
          <a
            className="hidden sm:flex justify-left cursor-pointer text-white z-[15] fixed top-0 right-0 max-w-[1300px] mx-6 mt-[116px] bg-grey p-2 rounded-full"
            onClick={() => handleClose()}
          >
            <img src={close} />
          </a>
        )}
      </div>
    </section>
  );
};

export default Jobs;
