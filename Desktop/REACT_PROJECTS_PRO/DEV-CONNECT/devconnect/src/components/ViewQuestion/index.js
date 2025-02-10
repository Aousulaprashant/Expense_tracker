import React from "react";
import Sidebar from "../StackoverFlow/SideBar.js";
import "./css/index.css";
import MainQuestion from "./MainQuestion";
import { useLocation } from "react-router-dom";

function Index() {
  const location = useLocation();

  const question = location.state?.question;

  if (!question) return <p>No question data found!</p>;
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <MainQuestion question={question} />
      </div>
    </div>
  );
}

export default Index;
