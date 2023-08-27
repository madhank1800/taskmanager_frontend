import React from "react";

import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  
  let isauthentica = localStorage.getItem("token");
  isauthentica = Boolean(isauthentica);

  
  return isauthentica ? children : <Navigate to="/" />;
};

export default Protected;
