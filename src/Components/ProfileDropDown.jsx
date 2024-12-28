import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import useAuthStore from "../Store/AuthStore";
import toast from "react-hot-toast";

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                '/Api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            clearAuth(); // Clears authentication data from the store
            toast.success(response.data.message); // Shows success message
            navigate('/login'); // Redirects to login
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            >
                <RxAvatar />
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-20"
                >
                    <Link
                        to="/user"
                        className="flex items-center px-4 py-3 hover:bg-gray-100 text-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiUser className="mr-3 text-lg" /> Profile
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-100 text-gray-700"
                    >
                        <FiLogOut className="mr-3 text-lg" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
