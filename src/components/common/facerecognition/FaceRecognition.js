import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgSrc, box }) => {
  return (
    <div className="flex-center ma">
      <div className="absolute mt2">
        <img id="inputimage" src={imgSrc} alt="image" width="300" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
