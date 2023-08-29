import React from "react";
import "./signup.css";
import { useState } from "react";
import axios from "axios";
// import { Await } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  //   const [email, setemail] = useState("");
  const [signinerror, setSignInError] = useState({
    firstnameError: false,
    lastNameError: false,
    emailError: false,
    phoneError: false,
    passwordError: false,
    confirmPasswordError: false,
    confirmPasswordSuccess: false,
  });
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState("show");
  // const [showPassError, setShowPassError] = useState('');

  const [isDisabledSignUpTag, SetDisabledSignUpTag] = useState(true);

  const [isSignedUpSuccess, setSignUpSuccess] = useState(false);

  const [isSignUpMsg, setSignedUpMsg] = useState("");

  const [isUserExisted, setUserExisted] = useState(false);
  const [isUserExistedMsg, setUserExistedMsg] = useState("");

  const userExistedMethod = (data) => {
    setUserExistedMsg(data);
    setUserExisted(true);
    setSignUpSuccess(false);
  };

  const SignUpSuccess = (data) => {
    setSignedUpMsg(data);
    setSignUpSuccess(true);
    setUserExisted(false);
  };

  function showPassword() {
    //let divtagPassword = document.getElementsByClassName('divtagPassword')[0];
    let divtagPassword = document.querySelector(".divtagPassword");
    // console.log(divtagPassword.getElementsByTagName('input'));
    let divtagChild = divtagPassword.querySelector(".divtagChild");
    //console.log(divtagPassword);
    //console.log("divtagChild", divtagChild);
   // let inputPasswordValue = divtagChild.value;
    //console.log(inputPasswordValue);
   // let inputValuePasswordLength = divtagChild.length;
   // console.log("inputValuePasswordLength ", inputValuePasswordLength);
    // if (inputValuePasswordLength >= 1) {
    if (divtagChild.type === "password") {
      divtagChild.type = "text";
      setShowPass("Hide");
    } else {
      divtagChild.type = "password";
      setShowPass("show");
      // setShowPassError("please enter values");
    }
  }
  function changeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;
    // let fnameErrorName = event.target.firstnameerror;
    let fnameErrorName = event.target.dataset.firstnameerror;
   // console.log(name);
   // console.log(value);
    //console.log("fnameErrorName tutu", fnameErrorName);
    setSignupDetails((previous) => {
      return { ...previous, [name]: value };
    });
  
    setSignInError((previous) => {
      console.log("signinerror1", signinerror);
      // return { ...previous, firstnameError: false };
      return { ...previous, [fnameErrorName]: false };
    });
    // }
    //console.log("signupdetails", signupDetails);
    //console.log("signinerror2", signinerror);

   
  }
  function validateData(event) {
    

    if (event.target.name === "firstname") {
      let firstNamePattern = /^[A-Za-z][A-Za-z0-9\s]*$/;
      let firstNameBooleanValue = firstNamePattern.test(event.target.value);
      //console.log(firstNameBooleanValue);
      if (!firstNameBooleanValue) {
        setSignInError((previous) => {
         // console.log("signuperror", signinerror);
          return { ...previous, firstnameError: !firstNameBooleanValue };
        });
       // console.log("signinerror3", signinerror);
      }
    }

    if (event.target.name === "lastName") {
      let lastNamePattern = /^[A-Za-z][A-Za-z0-9\s]*$/;
      let lastNameBooleanValue = lastNamePattern.test(event.target.value);
      //console.log(lastNameBooleanValue);
      if (!lastNameBooleanValue) {
        setSignInError((previous) => {
          // console.log("signuperror", signinerror);
          return { ...previous, lastNameError: !lastNameBooleanValue };
        });
        //console.log("signuperror4", signinerror);
      }
    }

    if (event.target.name === "email") {
      let emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      let emailBooleanValue = emailPattern.test(event.target.value);
     // console.log(emailBooleanValue);
      if (!emailBooleanValue) {
        setSignInError((previous) => {
          // console.log("signuperror", signinerror);
          return { ...previous, emailError: !emailBooleanValue };
        });
       // console.log("signuperror5", signinerror);
      }
    }

    if (event.target.name === "phone") {
      let phonePattern = /^\d{10}$/;
      let phoneBooleanValue = phonePattern.test(event.target.value);
      console.log(phoneBooleanValue);
      if (!phoneBooleanValue) {
        setSignInError((previous) => {
          // console.log("signuperror", signinerror);
          return { ...previous, phoneError: !phoneBooleanValue };
        });
       // console.log("signuperror5", signinerror);
      }
    }
    if (event.target.name === "password") {
      let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      let passwordBooleanValue = passwordPattern.test(event.target.value);
      //console.log(passwordBooleanValue);
      if (!passwordBooleanValue) {
        setSignInError((previous) => {
          // console.log("signuperror", signinerror);
          return { ...previous, passwordError: !passwordBooleanValue };
        });
       // console.log("signuperror6", signinerror);
      }
    }

    if (event.target.name === "confirmPassword") {
      if (event.target.value === signupDetails.password) {
        setSignInError((previous) => {
          return { ...previous, confirmPasswordSuccess: true };
        });
        setSignInError((previous) => {
          return { ...previous, confirmPasswordError: false };
        });
        console.log("signuperror7", signinerror);
      } else {
        setSignInError((previous) => {
          return { ...previous, confirmPasswordError: true };
        });
        setSignInError((previous) => {
          return { ...previous, confirmPasswordSuccess: false };
        });
       // console.log("signuperror8", signinerror);
      }
    }

    //setting the disabled and abled sign element

    if (
      signupDetails.firstname !== "" &&
      signupDetails.lastName !== "" &&
      signupDetails.email !== "" &&
      signupDetails.phone !== "" &&
      signupDetails.password !== "" &&
      signupDetails.confirmPassword !== ""
    ) {
      SetDisabledSignUpTag(false);
    }
  }


  

 


 
 

  

  const submitHandler = (event) => {
    event.preventDefault();
    const submitDetails = signupDetails;
    try {
      const response = axios.post(
        "https://taskmanager-backend-bdy0.onrender.com/user/register",
        submitDetails
      );
      response.then((data) => {
        //console.log("data", data);
        //console.log("data", data.data);
        const msg = data.data;
        if (msg === "user already existed") {
          userExistedMethod(msg);
        } else {
          SignUpSuccess(data.data);
        }
      });
    } catch (err) {
      throw new Error("server error");
    }
    //console.log("submitdetails", submitDetails);
    //console.log("submitdetails", submitDetails);
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className=" d-flex card w-50 form-group flex-column  justify-content-center  align-items-center mt-4 
         bg-light bg-opacity-90 
         shadow-lg
          rounded "
        >
          <h3>signup form</h3>
          <form
            // className="card w-50"
            className="d-flex flex-column custominput1"
            onSubmit={submitHandler}
            // action="/routes/Signin"
            // method="post"
            autoComplete="on"
          >
            <div
              //className="row mt-3 card-body  justify-content-center"
              className="row mt-3 "
            >
              <div
                className="position-relative"
                // className="divtag form-control border border-primary col-12 col-md-6"
              >
                <input
                  type="text"
                  // className="form-control"
                  className=" form-control inputTagClass "
                  placeholder="Enter first name"
                  name="firstname"
                  id="myinput"
                  value={signupDetails.firstname}
                  data-firstnameerror="firstnameError"
                  onChange={changeHandler}
                  onBlur={validateData}
                  // pattern="^([a-zA-Z])*$"
                  // pattern="^[A-Za-z][A-Za-z0-9\s]*$"
                  autoComplete="off"
                />

                <div className="d-flex flex-column justify-content-start align-items-start top--5">
                  {signinerror.firstnameError && (
                    <span className="text-danger errorDetail justify-content-start ">
                      enter correct firstName id
                    </span>
                  )}
                </div>
              </div>

              {/* <div className="d-flex flex-column justify-content-start align-items-start  mt-0">
                {signinerror.firstnameError && (
                  <p className="text-danger errorDetail">
                    enter correct firstName id
                  </p>
                )}
              </div> */}
              <div
              // className="mt-4 divtag form-control border border-primary"
              >
                <input
                  type="text"
                  // className="form-control"
                  className=" form-control inputTagClass   mt-4 "
                  placeholder="Enter last Name"
                  name="lastName"
                  value={signupDetails.lastName}
                  onChange={changeHandler}
                  id="mylastNameInput"
                  onBlur={validateData}
                  data-firstnameerror="lastNameError"
                  // pattern="^[A-Za-z][A-Za-z0-9\s]*$"
                  autoComplete="on"
                />
                <div className="d-flex flex-column align-items-start">
                  {signinerror.lastNameError && (
                    <p
                      className="
                      errorMsg
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                    >
                      enter correct lastName id
                    </p>
                  )}
                </div>
              </div>
              <>
                {/* <div className="d-flex flex-column justify-content-start">
                  {signinerror.lastNameError && (
                    <p
                      className="
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                    >
                      enter correct lastName id
                    </p>
                  )}
                </div> */}
              </>

              <div
              // className="mb-4 divtag form-control border border-primary"
              >
                <input
                  type="email"
                  //className="form-control"
                  className="form-control  inputTagClass mb-4 mt-4 "
                  placeholder="Enter email"
                  name="email"
                  // value={signupDetails.email}
                  // onChange={changeHandler}
                  value={signupDetails.email}
                  onChange={changeHandler}
                  data-firstnameerror="emailError"
                  id="myEmailInput"
                  // pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                  onBlur={validateData}
                  autoComplete="off"
                />
                {/* {signinerror.emailError && <p>enter correct email id</p>} */}
              </div>
              <>
                {signinerror.emailError && (
                  <p
                    className="
                       errorMsg
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                  >
                    enter correct email id
                  </p>
                )}
              </>
              <div
              // className="mb-4 form-control border border-primary"
              >
                <input
                  type="tel"
                  // className="form-control"
                  className=" form-control inputTagClass mb-4 "
                  placeholder="Enter phone Number"
                  name="phone"
                  data-firstnameerror="phoneError"
                  value={signupDetails.phone}
                  onChange={changeHandler}
                  onBlur={validateData}
                  autoComplete="on"
                />
                {/* {signinerror.phoneError && <p>enter correct phone id</p>} */}
              </div>
              <>
                {" "}
                {signinerror.phoneError && (
                  <p
                    className="
                       errorMsg
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                  >
                    enter correct phone id
                  </p>
                )}
              </>

              <div
                //className="mb-4 input-group divtagPassword d-flex flex-row justify-content-betweenborder "
                className="mb-4 input-group divtagPassword border-1 border-primary "
              >
                <input
                  type="password"
                  // className="form-control divtagChild border-0"
                  className=" form-control divtagChild  inputTagClass border-1  "
                  placeholder="Enter password"
                  name="password"
                  data-firstnameerror="passwordError"
                  value={signupDetails.password}
                  onChange={changeHandler}
                  id="myPasswordInput"
                  onBlur={validateData}
                  // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  autoComplete="off"
                />
                <button
                  className="input-group-append d-flex justify-content-start divtagChild  showPasswordClass  inputTagClass  "
                  onClick={showPassword}
                >
                  {showPass}
                </button>

                {signinerror.passwordError && (
                  <div
                    className="
                       errorMsg
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                  >
                    password should be alphanumeric and special charecters
                  </div>
                )}
              </div>
              <></>

              <div
              //className="mb-4 form-control border border-primary"
              >
                <input
                  type="password"
                  // className="form-control"
                  className="form-control inputTagClass justify-content-end mb-4 "
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={signupDetails.confirmPassword}
                  onChange={changeHandler}
                  onBlur={validateData}
                  autoComplete="off"
                />
                {/* {signinerror.confirmPasswordSuccess && (
                <p id="passid">password mathced</p>
              )}
              {signinerror.confirmPasswordError && <p>password not mathced</p>} */}
              </div>
              <>
                {signinerror.confirmPasswordSuccess && (
                  <p id="passid">password mathced</p>
                )}
                {signinerror.confirmPasswordError && (
                  <p
                    className="
                       errorMsg
                    text-danger
                    errorDetail
                    justify-content-start
                    align-items-start"
                  >
                    password not mathced
                  </p>
                )}
              </>

              {/* <div className="mt-4">
              <button type="submit" className="btn btn-primary ml-4">
                Signup
              </button>
            </div> */}

              <div>
                {isDisabledSignUpTag ? (
                  <div className="mb-4 d-flex form-control inputTagClass signbtnclass  ">
                    {/* <span onClick={submitHandler} className=" btnclass ml-5">
                Signup
              </span> */}
                    signup
                  </div>
                ) : (
                  <div
                    onClick={submitHandler}
                    className="mb-4 form-control  d-flex  border border-primary signbtnclass signbtnclass1 "
                  >
                    {/* <span onClick={submitHandler} className=" btnclass ml-5">
                Signup
              </span> */}
                    signup
                  </div>
                )}
              </div>
              <>
                {isSignedUpSuccess && (
                  <p id="success">
                    <i className="bi bi-check-circle-fill signupSuccessClass"></i>
                    {isSignUpMsg}
                  </p>
                )}
              </>
              <>
                {isUserExisted && (
                  <p id="userExisted">
                    <i className="bi bi-exclamation-circle-fill userExistClass"></i>
                    {isUserExistedMsg}
                  </p>
                )}
              </>
            </div>
          </form>
          <div className="mb-4  d-flex flex-column justify-content-center align-items-center inputTagClass bg-cadetblue signbtnclass signbtnclass1 loginTag ">
            <span
              onClick={() => {
                navigate("/");
              }}
              className=" btnclass ml-5"
            >
              login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
