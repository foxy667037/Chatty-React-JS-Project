import {
  BellIcon,
  MessageCirclePlusIcon,
  Search,
  ChevronUp,
  ChevronDown,
  SettingsIcon,
  LogOutIcon,
  CircleGaugeIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { logoutUser, isLogginingOut, allUsers } = useAuthStore();
  const [inputQuery, setInputQuery] = useState("");
  const [results, setresults] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(allUsers)) return;

    const searchedUser = inputQuery.toLowerCase();

    const filtered = allUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchedUser) ||
        user.username.toLowerCase().includes(searchedUser) ||
        user.email?.toLowerCase().includes(searchedUser)
    );

    setresults(filtered);
  }, [allUsers, inputQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white relative z-50">
      {/* logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo/chat_309666.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <div className="flex gap-0.5 flex-col">
          <h1 className="text-2xl font-medium transition-all font-sans bg-gradient-to-br from-purple-600 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2 hover:drop-shadow-sm">
            Chatty
          </h1>
          <p className="text-xs text-gray-500 leading-3">
            Connect. Chat. Chill.
          </p>
        </div>
      </div>

      {/* search */}
      <div className="relative w-full max-w-md mx-6">
        <Search
          size={18}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          ref={inputRef}
          value={inputQuery}
          onChange={(e) => {
            setInputQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          placeholder="e.g foxy667037"
          className="w-full border-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-0 focus:outline-none bg-transparent pl-9 pr-14 py-3 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-300"
        />

        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gray-100 text-xs px-2 py-1 rounded font-semibold text-gray-500 shadow-sm">
          ⌘ K
        </div>

        {showResults && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-md text-gray-500 shadow-lg z-40 max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {results.map((user, index) => (
                  <li
                    key={index}
                    className="group px-4 py-3 flex items-start gap-3 border border-gray-100 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-md hover:shadow-lg hover:from-indigo-50 hover:to-blue-100 transition-all duration-300 cursor-pointer"
                  >
                    {/* Profile picture */}
                    <img
                      src={user.profilePicPath}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {user.fullName}
                        </p>
                        <span className="text-sm text-gray-500">
                          ({user.username})
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {/* View Profile link */}
                    <div className="flex flex-col justify-center items-end">
                      <a
                        href={`/user/${user.username}`}
                        className="text-xs text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
                      >
                        View Profile
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2 relative">
        <Link
          to={"/setting"}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <SettingsIcon size={20} className="text-gray-600" />
        </Link>

        <button className="px-4 py-2 rounded-full flex justify-center items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-all">
          <MessageCirclePlusIcon size={20} />{" "}
          <span className="font-sans font-semibold">New Chat</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-1">
              <BellIcon size={20} className="text-gray-600" />
              {showTooltip ? (
                <ChevronUp size={16} className="text-gray-500 transition-all" />
              ) : (
                <ChevronDown
                  size={16}
                  className="text-gray-500 transition-all"
                />
              )}
            </div>
          </button>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm z-50"
              >
                <div className="space-y-2">
                  <div className="w-full h-2 bg-gray-200 rounded-md animate-pulse" />
                  <div className="w-4/5 h-2 bg-gray-200 rounded-md animate-pulse" />
                  <div className="w-3/5 h-2 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          {isLogginingOut ? (
            <CircleGaugeIcon size={20} className="animate-spin" />
          ) : (
            <LogOutIcon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
}
