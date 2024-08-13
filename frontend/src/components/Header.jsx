import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button } from "./ui";

const Header = () => {
  const [cookies, removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    removeCookie("token");
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setUsername("");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user`,
        cookies.token,
        { withCredentials: true }
      );
      setUsername(res.data.user.username);
    };
    verifyCookie();
  }, [cookies]);

  return (
    <header className="flex fixed top-0 w-full bg-primary justify-between sm:py-4 sm:px-12 py-2 px-4 border-b border-gray-900/30">
      <Link to={"/"} className="text-5xl uppercase font-extrabold">
        News
      </Link>

      {username ? (
        <div className="flex items-center gap-4">
          <button
            className={`flex justify-center items-center font-bold bg-transparent text-tertiary px-4 py-3 rounded-lg ring-2 ring-tertiary`}
          >
            {username}
          </button>
          <button
            onClick={handleLogout}
            className="flex justify-center items-center font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary"
          >
            Logout
          </button>
        </div>
      ) : location.pathname.includes("sign-in") ? (
        <></>
      ) : (
        <Link
          to={"/sign-in"}
          className="flex justify-center items-center font-bold bg-tertiary text-white px-4 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary"
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
