import React, { useMemo, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import type { AuthLoginPayload } from "../features/auth/types";

const initialValues: AuthLoginPayload = {
  username: "rootuser",
  password: "root1234"
};

const LoginForm = () => {
  
  const [formData, setFormData] = useState<AuthLoginPayload>({
    ...initialValues,
  });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Function to handle input changes
  // Using useMemo to optimize performance by memoizing the function
  const handleInputChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // Validate the input value
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  }, []);

  // If loading, return the loader component
  if (loading) {
    return <Loader />;
  }

  // Function to handle login
  // This function will be called when the user clicks the "Login" button
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Username and password cannot be empty");
      return;
    }

    const response = await login(formData);

    console.log("Login response data:", response);
    if (response?.status == 200) {
      // Redirect to dashboard after successful login
      navigate(`/dashboard/${response.data.user.userName}/todos`, { replace: true });
    }
  };

  return (
    <div className="auth-login_form *:w-80 bg-white rounded-lg flex justify-center items-center mt-40">
      <form className="*:w-full" onSubmit={handleLogin}>
        <h1 className="text-lg font-medium">
          Welcom back! Access Your Account
        </h1>
        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          styleClass="h-10 text-black"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          styleClass="h-10 text-black"
        />

        <Button
          type="submit"
          title="Login"
          styleClass={`text-white font-semibold h-12 mt-4 bg-indigo-600 hover:bg-indigo-400 w-full rounded-md`}
          disabled={false}
          onClick={() => {}}
        />

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className=" underline text-indigo-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
