import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWpexplorer } from "react-icons/fa6";
import { IoIosDoneAll } from "react-icons/io";
import { FaBoltLightning } from "react-icons/fa6";
import { RiCommunityLine } from "react-icons/ri";
import { FcAdvertising } from "react-icons/fc";
import { GrHelpBook } from "react-icons/gr";
import { TbUserCog } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
function SideBar() {
    return (
        <div className="w-full h-screen bg-white shadow-md rounded-lg py-4">
            <div className="px-4 border-b">
                <ul className="flex flex-col justify-center items-center">
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <FaHome className="text-blue-500" />
                            <span className="text-gray-700">Home</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/popular' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <FaBoltLightning className="text-blue-500" />
                            <span className="text-gray-700">Popular</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/explore' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <FaWpexplorer className="text-blue-500" />
                            <span className="text-gray-700">Explore</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <IoIosDoneAll className="text-blue-500" />
                            <span className="text-gray-700">All</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="px-4 mt-4 border-b">
                <ul className="flex flex-col">
                    <li className="w-full mb-1">
                        <NavLink to='/post/create' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <IoMdAdd size={24} className="text-gray-700 hover:text-blue-600 transition duration-200" />

                            <span className="text-gray-700">Create Post</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/user' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <CiUser className="text-blue-500" />
                            <span className="text-gray-700">User</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <IoMdNotificationsOutline size={24} className="text-blue-500 " />
                        
                            <span className="text-gray-700">Notification</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="px-4 mt-4 border-b">
                <ul className="flex flex-col">
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <RiCommunityLine className="text-blue-500" />
                            <span className="text-gray-700">Communities</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <FcAdvertising className="text-blue-500" />
                            <span className="text-gray-700">Advertise</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <GrHelpBook className="text-blue-500" />
                            <span className="text-gray-700">Help</span>
                        </NavLink>
                    </li>
                    <li className="w-full mb-1 text-center">
                        <NavLink to='/' className="flex items-center justify-center space-x-3 py-3 px-2 rounded-md hover:bg-blue-100 transition duration-150">
                            <TbUserCog className="text-blue-500" />
                            <span className="text-gray-700">User Agreement</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
