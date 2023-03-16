import React from "react";
import "../../styles/castle.css";

export const Castle = () => {
  return (
    <div className="container">
      <svg className="arc">
        <circle></circle>
      </svg>
      <div className="portcullis"> </div>
      <div className="castle base-1"> </div>
      <div className="castle base-2"> </div>
      <div className="castle base-3"> </div>
      <div className="castle base-4"> </div>
      <div className="base-tower left"></div>
      <div className="base-tower right"></div>
      <div className="castle mid-tower-left"></div>
      <div className="mid-tower-left-roof"></div>
      <div className="mid-tower-right"></div>
      <div className="level-2-tower-left"></div>
      <div className="level-2-tower-right"></div>
      <div className="castle level-3-tower"></div>
      <div className="level-3-tower-roof"></div>
      <div className="castle keep-base"></div>
      <div className="castle keep-main"></div>
      <div className="keep side-tower"></div>
      <div className="keep side-tower roof"></div>
      <div className="castle keep"></div>
      <div className="castle main-tower"></div>
      <div className="main-tower-roof"></div>
      <div className="main-side-roof"></div>
      <div className="keep tower-roof"></div>
    </div>
  );
};
