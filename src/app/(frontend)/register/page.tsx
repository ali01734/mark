"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error before new submission
    setError(null);

    if (formData.password !== formData.password_confirmation) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading before request
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/V1/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();

        localStorage.setItem(
          "access_token",
          result.data.access_token.accessToken
        );
        localStorage.setItem("username", result.data.user.name);
        formRef.current?.reset();
        router.push(`/`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading when request completes
    }
  };

  return (
    <>
      {loading ? (
        <Loading /> // Show Loading spinner while the request is being processed
      ) : (
        <div className="py-20 px-10">
          <div className="container mx-auto">
            <div className="lg:w-1/2 mx-auto">
              <h1 className="text-center text-2xl font-semibold mb-4 text-gray-800">
                Create Account
              </h1>
              {error && (
                <div
                  id="form-error-mess"
                  className="bg-red-100 border border-red-500 text-red-800 p-4 mb-7"
                >
                  <h2 className="text-xl font-semibold text-center relative pb-12 text-gray-800">
                    Please adjust the following:
                    <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 h-px w-20 mx-auto"></span>
                  </h2>
                  <p className="text-gray-600 text-base">
                    <i className="fas fa-circle text-xs text-gray-600 pr-2"></i>
                    {error}
                  </p>
                </div>
              )}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="pp-firstname"
                >
                  First Name*
                </label>
                <input
                  id="pp-firstname"
                  type="text"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="pp-lastname"
                >
                  Last Name*
                </label>
                <input
                  id="pp-lastname"
                  type="text"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleInputChange}
                  autoComplete="last_name"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="pp-email"
                >
                  Email*
                </label>
                <input
                  id="pp-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="pp-address"
                >
                  Address*
                </label>
                <input
                  id="pp-address"
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="pp-password"
                >
                  Password*
                </label>
                <input
                  id="pp-password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <label
                  className="block text-base font-normal text-gray-700 mb-1"
                  htmlFor="password-confirm"
                >
                  Password Confirmation*
                </label>
                <input
                  id="password-confirm"
                  type="password"
                  name="password_confirmation"
                  required
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 focus:outline-none"
                />
                <div className="text-center mt-4">
                  <input
                    className="bg-green-700 text-white py-3 px-10 mt-2 border-none rounded cursor-pointer focus:outline-none"
                    type="submit"
                    value="CREATE"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
