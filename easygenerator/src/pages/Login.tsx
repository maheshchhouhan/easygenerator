import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useLoginForm();
  const { login: authLogin } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const token = await login(data);
      authLogin(token);
      toast.success("Login successful!");

      setTimeout(() => navigate("/application"), 1000);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit">Sign In</Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
