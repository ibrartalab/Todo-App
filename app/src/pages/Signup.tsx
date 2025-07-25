import { useMemo, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
// import useFormValidator from "../../../hooks/useFormValidator";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import { type AuthSignupInput } from "../api/authAPI";
import { Link } from "react-router";
import { Loader } from "../components/Loader";

const initialState: AuthSignupInput = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
};

const SignUpForm = () => {
  //states
  // const { validateForm, formErrors, isValid } = useFormValidator();
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState<AuthSignupInput>({
    ...initialState,
  });
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [showConfirmPassword, setShowConfirmPassword] =
  //   useState<boolean>(false);

  //functions
  const handleInputChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // Validate the input value
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleSignUp = () => {
    // Logic to handle signup
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Username and password cannot be empty");
      return;
    }
    // Call the signup function from useAuth hook
    signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
    })
      .then((response) => {
        if (response) {
          console.log("Signup successful:", response);
          // Redirect to login page after successful signup
        }
        if (response?.statusCode === 201) {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        alert("Signup failed. Please check your details.");
      });
  };

  return (
    <>
      <div className="auth-signup_form flex justify-center items-center mt-40">
        <div className="form_container ">
          <form
            action=""
            className="form_fields "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="email_password_confirm-password  flex flex-col *:w-80 *:h-12">
              <h1 className="text-lg font-medium text-center">
                Create Your Account
              </h1>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                styleClass="text-black"
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                styleClass="text-black"
              />
              <Input
                label="Username"
                placeholder="Enter your username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                styleClass="text-black"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                styleClass="text-black"
              />
              <Button
                title="Get Started"
                styleClass={`text-white font-semibold h-12 mt-4 bg-indigo-600 hover:bg-indigo-400 w-full rounded-md`}
                disabled={false}
                onClick={handleSignUp}
              />
              <p className="text-sm text-center font-normal mt-4">
                Have an account already{" "}
                <Link to={"/login"} className="underline text-indigo-600">
                  login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
