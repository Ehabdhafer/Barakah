import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";
import { useNavigate } from "react-router-dom";






const SignIn = () => {
  const navigate = useNavigate();
  const {login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSignin= async() => {
    try {
     
      const response = await axios.get(
        " http://localhost:5000/auth/google"
      );
      login(response.data.token);
      navigate("/");
    } catch (error) {
  
      //swal("Error!", error, "success");
    }
  
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for submission
    const postData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Send data using Axios
      const response = await axios.post(
        "http://localhost:5000/login",
        postData
      );
      login(response.data.token);
      navigate("/");

      // Handle success (you can customize this part based on your API response)
      // swal("Done!", "You've signed up successfully", "success");
    } catch (error) {
      // Handle error (you can customize this part based on your API error handling)
      swal("Error!", error, "success");
    }
  };

  return (
    <div className="relative">
      <div className="absolute w-1/2 bg-blue h-[25%] mt-16 shadow-md">
        <h1 className="absolute top-[55%] left-[65%] text-4xl text-white font-bold">
          SIGN IN
        </h1>
        <p className="absolute top-[73%] left-[65%] text-sm text-white font-medium">
          Join the change we make
        </p>
      </div>
      <div className="absolute w-[30%] h-11 bg-div mt-36 "></div>
      <div className="bg-background p-40 ">
        <div className="max-w-xl mx-auto  p-28 bg-white shadow-lg text-blue pt-48">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="block w-full p-2 mt-1 border h-10"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="block w-full p-2 mt-1 border h-10"
              />
            </div>

            <div className="text-center mt-8 ">
              <button
                type="submit"
                className="bg-orange  text-white py-2 px-20 shadow-md text-md font-semibold "
              >
                Sign In
              </button>

              
            </div>
          </form>
          <div className="text-center mt-4">
                <div className="font-medium mb-4">or </div>
                <button className="bg-transparent border border-blue text-blue py-2 px-8  text-md font-semibold" onClick={handleGoogleSignin}>
                  Sign In with Google
                </button>
              </div>

              <div className="text-blue font-medium text-md mt-6">
                Don't have an account?{" "}
                <Link to="/signup">
                  {" "}
                  <button className="font-bold">Sign Up</button>
                </Link>
              </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default SignIn;
