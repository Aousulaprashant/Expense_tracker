import React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import "./css/index.css";
const index = () => {
  return (
    <div className="main-div">
      <SideBar />
      <Main />
    </div>
  );
};

export default index;
