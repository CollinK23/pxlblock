import React from "react";
import Profile from "./Profile";
import { useState } from "react";
import { fields } from "../constants";

const Hire = () => {
  const [nameFilter, setNameFilter] = useState("");
  const data = [
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
    {
      name: "Name 2",
      userImage:
        "https://pbs.twimg.com/profile_images/1486601457738518528/d1hjrCvw_400x400.jpg",
      jobs: ["Freelance", "Full-Time"],
      skills: ["Industrial Design", "Graphic Design", "Illustration"],
      work: [
        "https://pbs.twimg.com/media/E7U6cq1VgAAkNVM?format=jpg&name=large",
        "https://pbs.twimg.com/media/E3YBER-VIAAcrYm?format=jpg&name=large",
        "https://pbs.twimg.com/media/E6SAawEVUAM93tX?format=jpg&name=4096x4096",
      ],
      likes: "103.7K",
      views: "1.4M",
      followers: "25.4K",
    },
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
    {
      name: "Name 2",
      userImage:
        "https://pbs.twimg.com/profile_images/1486601457738518528/d1hjrCvw_400x400.jpg",
      jobs: ["Freelance", "Full-Time"],
      skills: ["Industrial Design", "Graphic Design", "Illustration"],
      work: [
        "https://pbs.twimg.com/media/E7U6cq1VgAAkNVM?format=jpg&name=large",
        "https://pbs.twimg.com/media/E3YBER-VIAAcrYm?format=jpg&name=large",
        "https://pbs.twimg.com/media/E6SAawEVUAM93tX?format=jpg&name=4096x4096",
      ],
      likes: "103.7K",
      views: "1.4M",

      followers: "25.4K",
    },
  ];
  return (
    <section className="bg-primary py-[100px]">
      <div className="flex justify-center items-center mx-auto">
        <form action="/search" method="get">
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              name="q"
              placeholder="Name..."
              className=" bg-grey max-w-[800px] w-[100%] h-[48px] outline-none text-white px-4"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <select
              id="fields"
              name="fields"
              className="hidden sm:inline h-[48px] w-[100%] text-white bg-grey outline-none px-4 ml-2"
            >
              {fields.map((field, index) => (
                <option value={field} key={index}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="project__grid">
        {data.map(
          (stats, index) =>
            stats.name.includes(nameFilter) && (
              <Profile key={index} stats={stats} />
            )
        )}
      </div>
    </section>
  );
};

export default Hire;
