import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
