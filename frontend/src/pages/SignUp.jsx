import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui";

const SignUp = () => {
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
        `${import.meta.env.VITE_BACKEND_URI}/user/sign-up`,
        userData,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-primary h-screen flex justify-center items-center">
      <div className="border-2 border-gray-900/10 bg-white py-10 px-8 rounded-3xl flex flex-col gap-6 min-w-80">
        <h1 className="font-bold text-2xl text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="font-semibold">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="rounded-lg ring-1 ring-slate-900/10 text-xl py-2 px-4 focus:outline-none"
          />
          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="rounded-lg ring-1 ring-slate-900/10 text-xl py-2 px-4 focus:outline-none"
          />
          <Button value={"Sign Up"} className="mt-2" submit />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
