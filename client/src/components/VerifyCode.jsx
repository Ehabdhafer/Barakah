import React, { useRef, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";

function VerifyCode() {
  const [verificationCode, setVerificationCode] = useState([]);
  const navigate = useNavigate();
  const { resetPasswordEmail } = useAuth();
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = value;
    setVerificationCode(updatedCode);

    // Move focus to the next input if available
    if (index < inputRefs.current.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      let codeAsString = "";
      for (let i = 0; i < 6; i++) {
        const inputFieldName = `code${i}`;
        const inputFieldValue = e.target.elements[inputFieldName].value;
        codeAsString += inputFieldValue;
      }

      const response = await axios.post(
        "http://localhost:5000/verificationCode",
        {
          verificationCode: codeAsString,
        }
      );

      navigate("/reset-password");
    } catch (error) {
      console.log("Error message:", error.message);
    }
  };
  const resendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3999/sendEmail", {
        email: resetPasswordEmail,
      });
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center min-h-screen py-12 bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="bg-second-color px-6 py-10 shadow-xl mx-auto w-full max-w-lg rounded">
        <div className="flex flex-col items-center justify-center text-center space-y-2 text-Base-color">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-third-color">
            <p>Check your email for the verification code</p>
          </div>
        </div>

        <form onSubmit={handleVerificationCodeSubmit}>
          <div className="grid grid-cols-6 gap-4 mt-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-16 h-16">
                <input
                  className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name={`code${index}`}
                  value={verificationCode[index] || ""}
                  ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  maxLength={1}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-5 mt-8">
            <div>
              <button class="w-full px-4 py-2 font-medium text-center text-second-color bg-fourth-color rounded hover:bg-second-color hover:text-fourth-color border border-fourth-color">
                Verify Account
              </button>
            </div>

            <div className="flex items-center justify-center text-sm font-medium space-x-1 text-third-color">
              <p>Didn't receive code?</p>{" "}
              <button
                className="flex items-center text-fourth-color"
                onClick={resendVerificationCode}
              >
                Resend
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;

// resend verification code isnt working it sends the same code but change it in back-end
