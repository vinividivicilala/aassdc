import { IoMdNotificationsOutline, IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";
import useAuthStore from "../Store/AuthStore";
import SearchBar from "./SearchBar";

function Navbar() {
  const isVerified = useAuthStore((state) => state.getUserVerified());

  return (
    <div className="py-3 px-8 sm:px-0 fixed top-0 w-full border-b bg-white shadow-md z-10 xl:px-32">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-2xl font-semibold text-blue-600 tracking-wide">BlogForum</h1>
          </Link>
        </div>

        {/* Centered Search Bar */}
        <div className="flex-grow hidden sm:flex justify-center items-center">
          <div className="w-30">
            <SearchBar />
          </div>
        </div>

        {/* Right-side icons and profile dropdown */}
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-150">
            <IoMdNotificationsOutline size={24} />
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span> */}
          </Link>

          <Link to="/post/create" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-150">
            <IoMdAdd size={24} />
            <span className="ml-1 font-medium">Create</span>
          </Link>

          <div className="flex items-center space-x-2">
            {isVerified ? (
              <ProfileDropdown />
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-150">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
