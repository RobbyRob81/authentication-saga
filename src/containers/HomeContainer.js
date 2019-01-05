import React from "react";
import { Link } from "react-router-dom";

const HomeContainer = () => (
  <div>
    <h1> Join up </h1>
    <br />
    <Link to="/signup"> JOIN Now </Link>
  </div>
);

export default HomeContainer;