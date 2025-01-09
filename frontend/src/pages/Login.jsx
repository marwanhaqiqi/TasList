import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, error } = useAuth();

  const { reset, register, handleSubmit } = useForm();

  const onSubmit = async (data) => await login(data);

  useEffect(() => {
    reset({
      email: "gallungmarwan147@gmail.com",
      password: "password",
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
