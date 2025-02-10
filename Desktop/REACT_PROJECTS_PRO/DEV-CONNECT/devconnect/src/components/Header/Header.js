import React from "react";
import logo from "../../IMG/logo.png";
import { FaSearch } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaInbox } from "react-icons/fa6";
import { RiQuestionLine } from "react-icons/ri";
import { RxFigmaLogo } from "react-icons/rx";
import { redirect, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/UserSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const Navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleHeader = () => {
    Navigate("/");
  };

  const handleLogout = () => {
    console.log("before:", user);
    signOut(auth);
    dispatch(logout());
    console.log(user);
    Navigate("/Auth");
  };

  return (
    <>
      <header className="container">
        <div className="start" onClick={handleHeader}>
          <img src={logo} />

          <h1>
            Dev<span>Connect</span>
          </h1>
          <div className="name">
            <h3>Products</h3>
          </div>
        </div>
        <div className="middle">
          <div className="inner">
            <FaSearch />
            <input type="text" className="search-bar" placeholder="Search.." />
          </div>
        </div>
        <div className="last">
          {user?.photoURL ? (
            <>
              <img
                src={user.photoURL}
                alt="User"
                onClick={handleLogout}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </>
          ) : (
            <RiAccountCircleFill size={30} onClick={handleLogout} />
          )}
          {/* <FaInbox size={30} />
          <RiQuestionLine size={30} />
          <RxFigmaLogo size={30} /> */}
        </div>
      </header>
    </>
  );
};

export default Header;
