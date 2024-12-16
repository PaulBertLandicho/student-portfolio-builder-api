import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // Toggle search visibility
    const [searchQuery, setSearchQuery] = useState(""); // Search input
    const [searchResults, setSearchResults] = useState([]); // Results

    const handleSearchClick = () => {
        setIsSearchVisible(prevState => !prevState); // Toggle search visibility
    };

    const handleSearchInput = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
        setSearchResults([]); // Clear results when input is empty
        return;
    }

    try {
        const response = await fetch(`/api/users/search?query=${query}`);
        if (response.ok) {
            const data = await response.json();
            setSearchResults(data); // Update with fetched results
        } else {
            setSearchResults([]); // If no results, clear the results array
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Handle API errors
    }
};

    

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <figure className="image">
                                <img src="/images/logo.png" alt="logo" style={{ width: "50px", height: "50px" }} />
                            </figure>
                        </div>
                    </div>

                     <div className="flex items-center space-x-4 ml-auto">
                            {isSearchVisible && (
                                <div className="relative">
                                    <input
                                       type="text"
                                       className="p-2 rounded-md border-2 border-gray-300"
                                       placeholder="Search users..."
                                       value={searchQuery} // Controlled component
                                       onChange={handleSearchInput} // Calls the fixed function
                                    />

        <div className="absolute bg-white rounded-md shadow-lg w-full mt-2">
                {searchQuery.trim() && searchResults.length === 0 ? (
                    <div className="p-4 text-center">
                        <span className="text-gray-500">No users found.</span>
                    </div>
                ) : (
                    searchResults.map((result) => (
                        <a
                            key={result.id}
                            href={route('api.profile.show', { id: result.id })}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            <div className="flex items-center">
                                <img
                                    src={
                                        result.image
                                            ? `/images/profile/${result.image}`
                                            : '/images/profile/default.png'
                                    }
                                    alt="user"
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                                <span>{result.fullname}</span>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    )}
                        <button
                            onClick={handleSearchClick}
                            className=" text-[#F5511E] "
                        >
                            <svg
                                className="h-6 w-6  "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                    </div>

    
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={(!showingNavigationDropdown ? 'inline-flex' : 'hidden')}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={(showingNavigationDropdown ? 'inline-flex' : 'hidden')}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={showingNavigationDropdown ? 'block' : 'hidden' + ' sm:hidden'}>
              
                <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('profile.setting')}>
                            Settings
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        {header && (
            <header className="bg-white shadow dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>
        )}

        <main>{children}</main>
    </div>
);
}