import Button from "../../Button";

const PersonalDetails = () => {
    const username = "john_doe";
    const email = "john@gmail.com";
  return (
    <div className="personal-details">
            <h2 className="text-md font-semibold underline text-indigo-500 mt-6">Personal Details</h2>
            <div className="details-list flex flex-col gap-2 mt-4">
                <div className="detail-item flex gap-2">
                    <span className="label font-medium">Full Name:</span>
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
                        onClick={() => alert("Edit Profile Clicked")}
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
  )
}

export default PersonalDetails