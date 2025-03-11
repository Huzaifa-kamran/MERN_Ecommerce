import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Account = () => {
    const [formData, setFormData] = useState({
        usernNme: '',
        userPassword: '',
    });
    const [loading, setLoading] = useState(false);

        const navigate = useNavigate();
        //  React toastify function 
        const handleToast = (message, toastType) => {
          toastType === "danger" ? toast.error(message) : toast.success(message);
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.userEmail ||!formData.userPassword) {
            handleToast("Please fill all fields", "danger");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/auth/login", formData);

            if (response.data.error) {
                handleToast(response.data.error, "danger");
            } else {
                handleToast(response.data.message, "success");
                localStorage.setItem("token", response.data.token);
                setFormData({ userEmail: "", userPassword: "" });
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            handleToast(error.response?.data?.error || "Something went wrong!", "danger");
        }
    }
    return (
        <section className="account py-80">
            <div className="container container-lg">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        {/* Login Card Start */}
                        <div className="col-xl-6 pe-xl-5">
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Login</h6>
                                <div className="mb-24">
                                    <label
                                        htmlFor="username"
                                        className="text-neutral-900 text-lg mb-8 fw-medium">Email address <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="username"
                                        placeholder="First Name"
                                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                                        value={formData.userEmail}
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="password"
                                        className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="password"
                                            placeholder="Enter Password"
                                            onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                                            value={formData.userPassword}
                                        />
                                        <span
                                            className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                                            id="#password"
                                        />
                                    </div>
                                </div>
                                <div className="mt-24">
                                    <Link
                                        to="/register"
                                        className="text-success-600 text-sm fw-semibold hover-text-decoration-underline"
                                    >
                                        Don't have an account? Register
                                    </Link>
                                </div>
                                <div className="mb-24 mt-48">
                                    <div className="flex-align gap-48 flex-wrap">
                                        <button type="submit" className="btn btn-main py-18 px-40">
                                            {loading ? 'Loading...' : 'Login'}
                                        </button>
                                        <div className="form-check common-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="remember"
                                            />
                                            <label
                                                className="form-check-label flex-grow-1"
                                                htmlFor="remember"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-48">
                                    <Link
                                        to="#"
                                        className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Login Card End */}

                    </div>
                </form>
            </div>
            <ToastContainer />
        </section>

    )
}

export default Account