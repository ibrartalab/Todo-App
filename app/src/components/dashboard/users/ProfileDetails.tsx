import { useState } from "react";
import Button from "../../Button";
import EditProfile from "./EditProfile";

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const username = "john_doe";
  const email = "john@gmail.com";

  const handleIsEditing = () => setIsEditing(!isEditing);
  return (
    <>
      {isEditing ? (
        <div className="edit-profile-section absolute top-1/4 left-1/3 w-1/3 h-max p-4  bg-white border border-gray-300 rounded-md shadow-md z-10">
          <EditProfile
            firstName="John"
            lastName="Doe"
            userName={username}
            email={email}
            setIsEditing={setIsEditing}
          />
        </div>
      ) : null}
      <div className={`personal-details ${isEditing ? "opacity-20" : ""} `}>
        <h1 className="text-lg font-semibold underline text-indigo-500">
          My Account
        </h1>
        <div className="header-personal-details flex flex-col justify-center">
          <div className="user-profile-icon w-20 h-20 flex justify-center items-center font-medium text-4xl rounded-full bg-indigo-500 text-white mt-4">
            {"R"}
          </div>
          <div className="user-name text-md font-medium">{username}</div>
          <div className="user-email text-sm font-normal">{email}</div>
        </div>
        <h2 className="text-md font-semibold underline text-indigo-500 mt-6">
          Personal Details
        </h2>
        <div className="details-list flex flex-col gap-2 mt-4">
          <div className="detail-item flex gap-2">
            <span className="label font-medium">First Name:</span>
            <span className="value">{username.split('_').at(0)}</span>
          </div>
          <div className="detail-item flex gap-2">
            <span className="label font-medium">Last Name:</span>
            <span className="value">{username.split('_').at(1)}</span>
          </div>
          <div className="detail-item flex gap-2">
            <span className="label font-medium">User Name:</span>
            <span className="value">{username}</span>
          </div>
          <div className="detail-item flex gap-2">
            <span className="label font-medium">Email:</span>
            <span className="value">{email}</span>
          </div>
          <div className="detail-item flex gap-2">
            <span className="label font-medium">Member Since:</span>
            <span className="value">January 2023</span>
          </div>
          <div className="action-buttons">
            <Button
              title="Edit Profile"
              onClick={() => handleIsEditing()}
              disabled={false}
              styleClass="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            />
            <Button
              title="Change Password"
              onClick={() => alert("Change Password Clicked")}
              disabled={false}
              styleClass="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
