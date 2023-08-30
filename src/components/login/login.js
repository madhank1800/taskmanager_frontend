import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    //firstname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [logDetailsErrorMsg, setLogDetailsErrorMsg] = useState(false);
  const [error, setError] = useState(false);

  const [isLogMsg, setLogMsg] = useState("");

  function usernameHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    setUserDetails((previous) => {
      return { ...previous, [name]: value };
    });
    setLogDetailsErrorMsg(false);
  }

  const logSuccess = (name) => {
    localStorage.setItem("authenticated", true);
    setLogDetailsErrorMsg(false);
    setLogMsg("");
    localStorage.setItem("profileName", name);
    navigate("/home");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const logindetailsList = userDetails;
    console.log("logindetailsList", logindetailsList);
    try {
      const responses = axios.post(
        "https://taskmanager-backend-bdy0.onrender.com/user/login",
        logindetailsList
      );

      responses
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("name", data.data.name);
          // console.log("dta", data.data.name);
          logSuccess(data.data.name);
        })
        .catch((err) => {
          setError(true);
          navigate("/");
        });
    } catch (err) {
      // console.log("err", err);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center loginBackground">
      <div
        className="d-flex  card w-50  flex-column from-group  justify-content-center align-items-center
      
         shadow-lg  rounded  logcss"
      >
        <h3>Login form</h3>
        {error && (
          <h5 class="alert alert-danger" role="alert">
            incorrect details
          </h5>
        )}
        <form
          className="d-flex flex-column custom-input"
          onSubmit={submitHandler}
          // method=""
          // action=""
        >
          <div className="row ">
            <div className="">
              <input
                className="form-control mb-5 mt-4 "
                // name="username"
                type="text"
                // name="firstname"
                name="email"
                value={userDetails.email}
                onChange={usernameHandler}
                placeholder="Enter email"
                aria-describedby="emailHelp"
              />
            </div>

            <div>
              <input
                className="form-control "
                type="password"
                name="password"
                value={userDetails.password}
                onChange={usernameHandler}
                placeholder="enter password"
              />
            </div>
            <div className="d-flex flex-column justify-content-start">
              {logDetailsErrorMsg && (
                <span className=" text-danger errorDetail">{isLogMsg}</span>
              )}
            </div>
            <div>
              <input
                className="form-control mt-5 mb-5 btn btn--block btn--solid btn--med loginbg"
                type="submit"
                // name="commit"
                value="Login Now"
                onClick={submitHandler}
              />
            </div>
          </div>
        </form>
        <div className="d-sm-flex flex-row flex-sm-col justify-content-sm-center align-items-sm-center">
          <div className="">
            <input
              className="form-control mb-5 btn btn--block btn--solid btn--med loginbg"
              type="submit"
              // name="commit"
              value="forgot password"
              onClick={() => {
                navigate("/ForgetPassword");
              }}
            />
          </div>
          <div className="ml-5">
            <input
              className="form-control mb-5 btn btn--block btn--solid btn--med loginbg"
              type="submit"
              // name="commit"
              value="Sign up"
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
