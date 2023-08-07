import React from "react";
import "./UserProfileCard.css";
import profile_icon from "../Components/Assets/Harish.jpg";

const UserProfileCard = () => {
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <img src={profile_icon} alt="img" />
        <div className="profile-title">Harry</div>
        <div className="profile-description">
          I am the team member of HPh technology Benglure
        </div>
        <div className="profile-button">
          <a href="mailto:harishhamad21@gmail.com">Contact Me</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
