import React, { useState } from "react";
import "./css/Auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
const Index = () => {
  const [register, setRegister] = useState(true);
  const [hover, setHover] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");

  const [loging, setloging] = useState(false);
  const [error, seteError] = useState("");

  const Navigate = useNavigate();

  const handleSigninGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      Navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setloging(true);
    seteError("");
    if (email === "" || password === "") {
      seteError("Please enter both email and password");
      setloging(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);

          setloging(false);
          Navigate("/");
        })
        .catch((err) => {
          console.log(err.code);
          seteError(err.message);
          setloging(false);
        });
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    seteError("");
    setloging(false);
    if (email === "" || password === "" || username === "") {
      seteError("Required field is missing.");
      setloging(false);
      // } else if (!validateEmail(email)) {
      //   setError("Email is malformed");
      //   setLoading(false);
      // }
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          Navigate("/");
          setloging(false);
        })
        .catch((error) => {
          console.log(error);
          seteError(error.message);
          setloging(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in using any of the following services. </p>
        <div className="sign-options">
          <div onClick={handleSigninGoogle} className="single-option">
            <img
              alt="google"
              src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png "
            />

            <p>{loging ? "Signing in..." : "Login with Google"}</p>
          </div>
          {/* <div className="single-option">
            <img
              alt="github"
              src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png "
            />
            <p>Login with Github</p>
          </div>
          <div className="single-option">
            <img
              alt="facebook"
              src="https://cdn-icons-png.flaticon.com/512/4494/4494497.png "
            />
            <p>Login with Linkedin</p>
          </div> */}
        </div>

        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                {" "}
                <div className="input-field">
                  <p>Username</p>
                  <input
                    value={username}
                    onChange={(e) => setuserName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                {error !== "" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  onClick={handleRegister}
                  disabled={loging}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loging ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  disabled={loging}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {loging ? "Logging in..." : "Login"}
                </button>
              </>
            )}

            <p
              onClick={() => setRegister(!register)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: hover ? "rgb(6, 40, 65)" : "#0095ff",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {register ? "Login" : "Register"} ?
            </p>
          </div>
        </div>
        {/* {error ? alert(error) : <></>} */}
      </div>
    </div>
  );
};

export default Index;
