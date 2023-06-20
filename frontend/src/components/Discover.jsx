import React from "react";
import { useState, useEffect } from "react";
import Project from "./Project";
import { fields } from "../constants";

const Discover = () => {
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All Creative Fields");
  const div = document.getElementById("projects");
  let [info, setInfo] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  let getInfo = async () => {
    let response = await fetch("/api/discover/");
    let data = await response.json();
    setInfo(data);
  };

  if (!info) {
    return <div></div>;
  }
  return (
    <section className="bg-primary py-[100px]">
      <div className="flex justify-center items-center mx-auto pt-[50px]">
        <form action="/search" method="get">
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              name="q"
              placeholder="Search..."
              className=" bg-grey max-w-[800px] w-[100%] h-[48px] outline-none text-white px-4"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
            />
            <select
              id="fields"
              name="fields"
              className="hidden sm:inline h-[48px] w-[100%] text-white bg-grey outline-none px-4 ml-2"
              value={fieldFilter}
              onChange={(e) => {
                setFieldFilter(e.target.value);
              }}
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
      <div id="projects" className="project__grid justify-center">
        {info.map((stats, index) => {
          if (
            (stats.projectName.includes(jobTitleFilter) ||
              stats.name.includes(jobTitleFilter)) &&
            (fieldFilter == "All Creative Fields" || stats.field == fieldFilter)
          ) {
            return <Project key={index} stats={stats} />;
          }
          return null;
        })}
      </div>
      {/* {div && div.innerHTML ? null : <p>No Results Matched Your Search</p>} */}
    </section>
  );
};

export default Discover;
