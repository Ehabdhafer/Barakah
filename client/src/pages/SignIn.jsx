// import React, { useState } from "react";
// import axios from "axios";
import swal from "sweetalert";
// import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";
// import { useNavigate } from "react-router-dom";
import donation from "../assets/food-donation.png";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userGoogle, setUserGoogle] = useState([]);

  // console.log(userGoogle);
  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    // console.log("userGoogle:", userGoogle);

    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          // console.log("Google User Info:", res.data);
          console.log("issa", res.data);

          try {
            const response = await axios.post(
              "http://localhost:5000/loginGoogle",
              res.data
            );
            console.log("Server response:", response.data.role_id);

            const token = response.data.token;
            const role_id = response.data.role_id;

            // Make sure the token is not undefined or null before storing it
            if (token) {
              login(token, role_id);
              navigate("/");
            }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  }, [userGoogle, navigate]);

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
      login(response.data.token, response.data.role_id);
      if (response.status === 202) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      // Handle success (you can customize this part based on your API response)
      // swal("Done!", "You've signed up successfully", "success");
    } catch (error) {
      // Handle error (you can customize this part based on your API error handling)
      if (error.response && error.response.status === 400) {
        // If the status code is 400, it means there is a specific error message
        swal("Error!", error.response.data.error, "error");
      } else {
        // Handle other errors
        swal("Error!", "An unexpected error occurred", "error");
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute w-[30%] bg-blue h-[25%] mt-16 shadow-md left-[28%] fade-in-s ">
        <img src={donation} alt="" className="absolute top-[52%] left-[20%]" />
        <h1 className="absolute top-[55%] left-[40%] text-4xl text-white font-bold ">
          SIGN IN
        </h1>
        <p className="absolute top-[73%] left-[40%] text-lg text-white font-medium ">
          Join the change we make
        </p>
      </div>
      <div className="absolute w-[12%] h-5 bg-gray mt-36 left-[28%] fade-in-s  "></div>
      <div className="bg-background p-28 ">
        <div className="max-w-xl mx-auto  p-24 bg-white shadow-lg text-blue pt-52 form-container-s ">
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
                className="bg-blue  text-white py-2 px-20 shadow-md text-md font-semibold "
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center mt-4 flex flex-col items-center justify-center">
            <div className="font-medium mb-4">or </div>
            <button
              className="bg-transparent border border-blue text-blue py-2 px-3  text-md font-semibold flex gap-2"
              onClick={() => loginbygoogle()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="22"
                height="22"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#26577c"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M26,2c-12.69141,0 -23,10.30859 -23,23c0,12.69141 10.30859,23 23,23c9.91797,0 15.97266,-4.5625 19.125,-10.21875c3.15234,-5.65625 3.55078,-12.30078 2.59375,-16.84375l-0.1875,-0.78125h-0.78125l-20.75,-0.03125h-1v10.40625h11.4375c-1.72656,4 -5.24219,6.75 -10.4375,6.75c-6.78906,0 -12.28125,-5.49219 -12.28125,-12.28125c0,-6.78906 5.49219,-12.28125 12.28125,-12.28125c3.05078,0 5.82031,1.12891 7.96875,2.96875l0.71875,0.59375l6.84375,-6.84375l0.71875,-0.75l-0.75,-0.6875c-4.08594,-3.72266 -9.53906,-6 -15.5,-6zM26,4c5.07422,0 9.65234,1.85547 13.28125,4.84375l-4.8125,4.8125c-2.37891,-1.77734 -5.26953,-2.9375 -8.46875,-2.9375c-7.87109,0 -14.28125,6.41016 -14.28125,14.28125c0,7.87109 6.41016,14.28125 14.28125,14.28125c6.55078,0 11.26172,-4.01562 12.9375,-9.46875l0.40625,-1.28125h-12.34375v-6.40625l18.84375,0.03125c0.66406,4.03516 0.22266,9.82813 -2.46875,14.65625c-2.85937,5.125 -8.05469,9.1875 -17.375,9.1875c-11.61328,0 -21,-9.39062 -21,-21c0,-11.60937 9.38672,-21 21,-21z"></path>
                  </g>
                </g>
              </svg>
              Sign In with Google
            </button>
          </div>

          <div className="text-blue font-medium text-md mt-6 text-center">
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
