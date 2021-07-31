import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./sb.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4" style={{ height: 150, width: 150 }}>
      <Tilt className="logo center br2 shadow-2">
        <img className="pa3" src={brain} alt="Smart Brain" width="100" />
      </Tilt>
    </div>
  );
};

export default Logo;
