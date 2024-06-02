import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sheader from "./Sheader";

const Login = () => {
  const [loginD, setLoginD] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLodininput = (e) => {
    const { name, value } = e.target;
    setLoginD((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", loginD);

      const { success, message } = response.data;
      console.log(response.data);

      if (success) {
        console.log(" if block exicuted");
      } else {
        if (loginD.username === "laxmanbabu") {
          navigate("/admin", { state: { id: loginD.username } });
        } else {
          navigate("/student-profile", { state: { id: loginD.username } });
        }
      }
    } catch (error) {
      alert("invalid username or password");
      console.log(error);
    }
    setLoginD({
      username: "",
      password: "",
    });
  };
  return (
    <div>
      <Sheader />
      <div className="login-div">
        <div className="inner-div">
          <h1>LOGIN HERE</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="inputfileds"
              name="username"
              placeholder="ENTER USER ID ..."
              value={loginD.username}
              onChange={handleLodininput}
            />
            <br />
            <input
              type="password"
              name="password"
              className="inputfileds"
              placeholder=" ENTER PASSWORD"
              value={loginD.password}
              onChange={handleLodininput}
            />
            <br />
            <button className="submitbnt" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
