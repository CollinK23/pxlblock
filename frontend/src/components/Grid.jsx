import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Project from "./Project";

const Grid = () => {
  let [info, setInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  let [path, setPath] = useState("/api/discover/");

  useEffect(() => {
    getInfo(path);
  }, []);

  let getInfo = async (path) => {
    let response = await fetch(path);
    let data = await response.json();
    setInfo(data);
  };

  if (!info) {
    return <div></div>;
  }

  return (
    <section className="bg-primary py-[100px]">
      <ul className="list-none flex flex-row text-[22px] cursor-pointer space-x-8 my-6 justify-center">
        <li>
          <div
            className={
              toggle
                ? "font-medium text-gray-600 border-b-[3px] border-transparent hover:border-gray-600 pb-2 transition duration-300 ease-in-out"
                : "font-semibold text-white border-b-[3px] pb-2"
            }
            onClick={() => {
              if (toggle !== false) {
                setToggle((prev) => !prev);
                setPath("/api/discover/");
                getInfo(path);
              }
            }}
          >
            For You
          </div>
        </li>
        <li>
          <p className="text-gray-600 cursor-default">|</p>
        </li>
        <li>
          <div
            className={
              toggle
                ? "font-semibold text-white border-b-[3px] pb-2"
                : "font-medium text-gray-600 border-b-[3px] border-transparent hover:border-gray-600 pb-2 transition duration-300 ease-in-out"
            }
            onClick={() => {
              if (toggle == false) {
                setToggle((prev) => !prev);
                setPath("/api/discover/");
                getInfo(path);
              }
            }}
          >
            Following
          </div>
        </li>
      </ul>
      <div className=" project__grid justify-center">
        {info.map((stats, index) => (
          <Project key={index} stats={stats} />
        ))}
      </div>
    </section>
  );
};

export default Grid;
