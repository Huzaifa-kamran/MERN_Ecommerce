import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: ''
    });
    const [loading, setLoading] = useState(false); // Add a loading state
    const navigate = useNavigate();
    //  React toastify function 
    const handleToast = (message, toastType) => {
      toastType === "danger" ? toast.error(message) : toast.success(message);
    };

    // Submission Function 
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // Show loading state
  
      try {
        const response = await axios.post("http://localhost:5000/auth/register", formData);
  
        if (response.data.error) {
          handleToast(response.data.error, "danger");
        } else {
          handleToast(response.data.message, "success");
          setFormData({ userName: "", userEmail: "", userPassword: "" });
          setTimeout(() => navigate("/account"), 2000);
        }
      } catch (error) {
        handleToast(error.response?.data?.error || "Something went wrong!", "danger");
      } finally {
        setLoading(false); // Hide loading state
      }
    };
  
  return (
    <section className="account py-80">
      <div className="container container-lg">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            {/* Register Card Start */}
            <div className="col-xl-6">
              <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                <h6 className="text-xl mb-32">Register</h6>
                <div className="mb-24">
                  <label
                    htmlFor="usernameTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium" >
                    Username <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="usernameTwo"
                    placeholder="Write a username"
                    onChange={(e)=>setFormData({...formData, userName: e.target.value})}
                    value={formData.userName}
                  />
                </div>
                <div className="mb-24">
                  <label htmlFor="emailTwo"
                    className="text-neutral-900 text-lg mb-8 fw-medium">
                    Email address
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    id="emailTwo"
                    placeholder="Enter Email Address"
                    onChange={(e)=>setFormData({...formData, userEmail: e.target.value})}
                    value={formData.userEmail}
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="enter-password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Password
                    <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input"
                      id="enter-password"
                      placeholder="Enter Password"
                      onChange={(e)=>setFormData({...formData, userPassword: e.target.value})}
                      value={formData.userPassword}
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                      id="#enter-password"
                    />
                  </div>
                </div>
                <div className="my-48">
                  <p className="text-gray-500">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our
                    <Link
                      to="#"
                      className="text-main-600 text-decoration-underline"
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
                <div className="mt-48">
                  <button type="submit" className="btn btn-main py-18 px-40">
                  {loading ? "Registering..." : "Register"}
                  </button>
                </div>
                 <Link
                    to="/account"
                    className="text-success-600 text-sm fw-semibold hover-text-decoration-underline">
                      Already have an account? Please Login</Link>
              </div>
            </div>
            {/* Register Card End */}
          </div>
        </form>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default Register;
