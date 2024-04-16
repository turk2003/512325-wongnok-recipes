"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="bg-gray-800 flex items-center justify-between">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center">
            {" "}
            {/* Center the content horizontally */}
            <div className="flex-shrink-0">
              <Link className="text-orange-400 font-bold" href="/">
                Wongnok Recipes
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center">
                <div className="flex-grow">
                  {loggedIn ? (
                    <div className="flex items-center space-x-4">
                      <Link
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        href="/profile"
                      >
                        Profile
                      </Link>
                      <Link
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        href="/api/auth/logout"
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Link
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        href="/api/auth/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        href="/"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            {/* Mobile menu button */}
            <button
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {loggedIn ? (
                <>
                  <Link
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/api/auth/logout"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/api/auth/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    href="/"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
