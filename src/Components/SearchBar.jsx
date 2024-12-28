import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '../Store/AuthStore';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function debounce(func, delay = 1000) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

function SearchBar() {
    const token = useAuthStore((state) => state.token);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [results, setResults] = useState([]); // State for the search results
    const [isSearching, setIsSearching] = useState(false); // Loading state for search
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const fetchResults = useCallback(
        debounce(async (query) => {

            if(query==='')
                setResults([]);
            setIsSearching(true);
            setError(null);
            try {
                const response = await axios.post('/Api/search', { query}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setResults(response.data);

            } catch (err) {
                console.error(err);
                // setError("An error occurred during the search.");
            } finally {
                setIsSearching(false);
            }
        }, 500),
        []
    );

    useEffect(()=>{
        fetchResults(searchTerm);
    },[searchTerm,fetchResults])



    function handleSub(e) {
        e.preventDefault();
        navigate('/search', { state: { results } });
        setResults([]);
    }

    function handleClick(title) {
        setSearchTerm(title);
        setResults([]);
    }

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <form onSubmit={handleSub}> {/* Prevent form submission */}
                <div className="flex items-center bg-white/50 backdrop-blur-lg border border-gray-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 ease-in-out max-w-lg mx-auto">
                    <FiSearch className="ml-4 text-gray-500 w-5 h-5" />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Search posts....."
                        className="rounded-md focus:outline-none p-2"
                    />
                    <button

                        className="px-4 py-2 bg-blue-500 text-white rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                    >
                        Go
                    </button>
                </div>


            </form>

            {/* Dropdown list for results */}
            {isSearching && (
                <div className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 z-10 shadow-lg p-4 text-center text-gray-600">
                    Searching...
                </div>
            )}
            {error && (
                <div className="absolute bg-white border border-red-300 rounded-lg w-full mt-2 z-10 shadow-lg p-4 text-center text-red-600">
                    {error}
                </div>
            )}
            {results.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-2 z-10 shadow-lg max-h-60 overflow-y-auto">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleClick(item.description.slice(0, 100))}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition"
                        >
                            {item.description.slice(0, 100)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
