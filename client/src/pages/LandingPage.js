import React from "react";
import Navbar from "../components/landingPage/Navbar";
import Vector from "../assets/img/landingPage/vector1.jpg";
import Login from "../components/landingPage/Login";
import Footer from "../components/landingPage/Footer";

export default function LandingPage(props) {
  return (
    <div className="h-screen max-h-min flex flex-col" style={{overflow: 'visible'}}>
      <Navbar></Navbar>

      <div className="body lg:flex px-16 w-full lg:h-5/6 ">
      <div className="lg:ml-auto lg:w-1/2 w-screen mr-30 pb-6">
          <Login
            setToastShow={props.setToastShow}
            settoastCondition={props.settoastCondition}
          ></Login>
        </div>
        <img
          src={Vector}
          alt="Graphics"
          className="lg:w-1/2 h-full lg:my-auto lg:mx-auto mt-10 pt-5"
        />
        
      </div>
      <div className="mt-auto relative -bottom-0">
        <Footer></Footer>
      </div>
    </div>
  );
}
