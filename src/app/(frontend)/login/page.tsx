"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Loading from "@/app/loading";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("UserId", result.data.user.id);
        localStorage.setItem("access_token", result.data.access_token.accessToken);
        localStorage.setItem("username", result.data.user.name);
        router.push(`/user/my-account`); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
          <>
          {loading ? (
            <Loading /> // Show Loading spinner while the request is being processed
          ) : (
          <main>
            <section>
              <div className="py-32">
                <div className="container mx-auto px-10">
                  <div className="w-full max-w-md mx-auto">
                    <h1 className="text-center text-4xl font-semibold text-gray-800 mb-4">
                      Customer Login
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label
                          className="block text-base font-normal text-gray-600 mb-1"
                          htmlFor="pp-email"
                        >
                          Email
                        </label>
                        <input
                          id="pp-email"
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="off"
                          autoFocus
                        />
                      </div>
                      <div>
                        <label
                          className="block text-base font-normal text-gray-600 mb-1"
                          htmlFor="pp-password"
                        >
                          Password
                        </label>
                        <input
                          id="pp-password"
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="text-center flex flex-col gap-5">
                        <a href="#" className="text-gray-800 text-base font-light">
                          Forgot your password?
                        </a>
                        <button
                          className="mt-4 px-[18px] py-[10px] bg-[#208B58] text-white rounded-md cursor-pointer w-1/2 mx-auto"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Signing In..." : "SIGN IN"}
                        </button>
                        <Link
                          href="/register"
                          className="block mt-4 text-gray-800 text-base font-light"
                        >
                          Create account
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
      </>
    );
}

export default LoginPage;
