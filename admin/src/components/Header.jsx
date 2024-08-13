import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex fixed top-0 w-full bg-primary justify-between sm:py-4 sm:px-12 py-2 px-4 border-b border-gray-900/30">
      <h1 className="text-5xl uppercase font-extrabold">News</h1>

      <div className="flex gap-3 justify-center items-center">
        <Link to={'/'} className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary">
          Create
        </Link>
        <Link to={'/news-list'} className="font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary">
          News List
        </Link>
      </div>
    </header>
  );
};

export default Header;
