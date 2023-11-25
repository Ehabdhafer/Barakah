import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"


const Generalinfo = ({ initialData }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial form data when initialData prop changes
    if (initialData) {
      setFormData({
        username: initialData[0].username || "",
        email: initialData[0].email || "",
        phone: initialData[0].phone || "",
        city: initialData[0].city || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate phone number
    const phoneNumberRegex = /^07\d{8}$/;
    if (!phoneNumberRegex.test(formData.phone)) {
      errors.phone =
        "Invalid phone number. It should start with 07 and be 10 digits long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      // Prepare data for submission
      const postData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
      };

      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = token;

        // Send data using Axios
        const response = await axios.put(
          "http://localhost:5000/updateuser",
          postData
        );

        // Handle success (you can customize this part based on your API response)
        swal("Done!", "Profile updated successfully", "success");
        navigate("/");
      } catch (error) {
        // Handle error (you can customize this part based on your API error handling)
        // swal("Error!", error, "success");
      }
    }
  };

  return (
    <div className="bg-background ">
      <div className="max-w-2xl mx-auto  top-40 p-28 bg-white shadow-lg text-blue pt-20">
        <h2 className="text-2xl font-bold mb-6">General Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              <label htmlFor="username" className="block text-sm font-bold">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`block w-full p-2 mt-1 border h-10 ${
                  formErrors.username ? "border-red-500" : ""
                }`}
              />
              {formErrors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.username}
                </div>
              )}
            </div>
            <div className="mb-4 col-span-2">
              <label htmlFor="email" className="block text-sm font-bold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full p-2 mt-1 border h-10 ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              {formErrors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.email}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-bold">
                  Phone:
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full p-2 mt-1 border h-10 ${
                    formErrors.phone ? "border-red-500" : ""
                  }`}
                />
                {formErrors.phone && (
                  <div className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-bold">
                  City:
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="block w-full p-2 mt-1 border h-10"
                >
                  {/* Add your city options here */}
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-bold"
            >
              Current Password:
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 border h-10"
            />
          </div> */}

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-orange text-white py-2 px-20 shadow-md text-md font-semibold mb-24"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Generalinfo;
