import React from "react";
import logo from "../images/NMREC-LOGO1.png";

const Sheader = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          background: "#F5DD61",
          padding: "10px",
          margin: "0px 0px 12px 0px",
        }}
      >
        <img
          className="logo"
          style={{
            width: "100px",
            height: "100px",
            margin: "15px 2px 5px 60px",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
          src={logo}
          alt="NMREC Logo"
        />
        <div
          style={{
            margin: "15px 2px 5px 70px",
            fontFamily:
              "Hoefler Text, Baskerville Old Face, Garamond, Times New Roman, serif",
          }}
        >
          <h1 style={{ color: "black" }}>
            WELLCOME TO STUDENT PROFILE MANAGENT SYSTEM !!
          </h1>
          <p style={{ color: "#453F78", fontWeight: "bold" }}>
            Nalla Malla Reddy Engineering College
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sheader;
