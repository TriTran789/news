import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "../components/ui";

const SignIn = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user/sign-in`,
        userData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-primary h-screen flex justify-center items-center">
      <div className="border-2 border-gray-900/10 bg-white py-10 px-8 rounded-3xl flex flex-col gap-6 min-w-80">
        <h1 className="font-bold text-2xl text-center">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="font-semibold">Username</label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            className="rounded-lg ring-1 ring-slate-900/10 text-xl py-2 px-4 focus:outline-none"
          />
          <label className="font-semibold">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="rounded-lg ring-1 ring-slate-900/10 text-xl py-2 px-4 focus:outline-none"
          />
          <Button value={"Sign In"} className="mt-2" submit />
          <p>
            Have a account?{" "}
            <Link to={`/sign-up`} className="font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
