"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Validations } from "@/app/validations/validations";
import { setCookie } from "nookies";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const router = useRouter();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    // Define the userData object with the current field value
    const userData = { username, password, [name]: value };

    // Validate the entire userData object
    const fieldErrors = Validations.validate(userData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] , // Update only the error for the blurred field
    }));
  };

  const handleSubmit = async(e: React.FormEvent,) => {
    e.preventDefault();
    // Validate inputs
    const validationErrors: { username?: string; password?: string } = {};
    if (!Validations.isValidUsername(username)) {
      validationErrors.username = "Invalid username. Please enter a valid username.";
    }
    if (!Validations.isValidPassword(password)) {
      validationErrors.password = "Invalid password. Password must meet the required criteria.";
    }

    // If there are validation errors, set them and stop execution
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent further execution if there are errors
    }

    const res = await fetch('/api/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if(res.ok){
    router.push("/products");
    router.refresh()
    }else{
      const {message} =await res.json();
      setErrors({username: message, password: message});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl border-gray-300 font-bold text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <h3 className="my-3 text-center font-bold">If not having an account </h3>
        <button
          onClick={() => router.push("/auth/register")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
