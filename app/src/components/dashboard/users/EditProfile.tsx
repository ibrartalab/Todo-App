import React, { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import { RxCross2 } from "react-icons/rx";

interface EditProfileProps {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
}

const initialProfileState: EditProfileProps = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
};

interface EditProfileComponentProps extends EditProfileProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile = ({
  firstName,
  lastName,
  userName,
  email,
    setIsEditing
}: EditProfileComponentProps) => {
  const [profileDetails, setProfileDetails] = useState<EditProfileProps>({
    ...initialProfileState,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSave = (
    fName: string,
    lName: string,
    uName: string,
    eId: string
  ) => {
    console.log("Saved details:", { fName, lName, uName, eId });
  };

  return (
    <div>
      <div className="heading-edit-profile flex justify-between items-center">
        <h2 className="text-lg font-medium text-indigo-500">
          Edit Profile
        </h2>
        <div className="close-btn">
            <Button
              title=""
              onClick={() => setIsEditing(false)}
              disabled={false}
              styleClass="text-2xl text-indigo-500 hover:text-indigo-700 w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200"
            >
              <RxCross2 className="text-xl"/>
            </Button>
        </div>
      </div>
      <div className="edit-profile-inputs mt-2 *:w-80 flex flex-col justify-center items-center">
        <Input
            label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={profileDetails.firstName}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
            label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={profileDetails.lastName}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
            label="User Name"
          type="text"
          name="userName"
          placeholder="User Name"
          value={profileDetails.userName}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
        label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={profileDetails.email}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          title="Save"
          onClick={() => onSave(firstName!, lastName!, userName!, email!)}
          disabled={false}
          styleClass="h-10 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        />
      </div>
    </div>
  );
};

export default EditProfile;
