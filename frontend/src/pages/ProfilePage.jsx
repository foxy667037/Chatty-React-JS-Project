import Navbar from "../components/Navbar";
import {
  UserRoundCog,
  GlobeLockIcon,
  UsersRound,
  LucideMessagesSquare,
  UserRoundXIcon,
  LucideLogIn,
  LogOutIcon,
} from "lucide-react";
import { SideBar } from "../components/SideBar";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { ConvertTime } from "../utils/convertTime.utils";

const slideUp = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const slideDown = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  const user = {
    image: "https://via.placeholder.com/100",
    name: "Muhammad Fahad",
    email: "fahad@example.com",
    joinedAt: "2024-01-15",
    links: ["https://www.google.com", "https://www.facebook.com"],
    totalContacts: 123,
    isPrivate: true,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex">
        <SideBar />
        <div className="w-full h-full py-8 pl-10 pr-12 rounded-tl-2xl -ml-8 bg-gradient-to-br from-gray-100 to-blue-50 ">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6 flex gap-2 items-center">
            <UserRoundCog size={28} /> Profile{" "}
            <span className="text-indigo-800">Page</span>
          </h1>

          <motion.div
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-2xl p-8 w-full mx-auto border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              {/* Profile Image */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="flex justify-center md:justify-end"
              >
                <img
                  src={authUser.profilePicPath}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 shadow-lg"
                />
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                className="flex-1 w-full space-y-5 text-gray-800 bg-gradient-to-r from-indigo-100 via-blue-100 to-blue-50 p-4 rounded-xl shadow-md"
              >
                <p className="text-lg font-semibold flex justify-between items-center">
                  <span className="text-indigo-600 flex items-center gap-1">
                    <GlobeLockIcon />
                    account Private:
                    <span className="text-gray-800">
                      {authUser.accountPrivate ? "On" : "Off"}
                    </span>
                  </span>

                  <span className="text-indigo-600 flex items-center gap-1">
                    <UsersRound />
                    Total Contacts:
                    <span className="text-gray-800">{user.totalContacts}</span>
                  </span>
                </p>

                <p className="text-lg font-semibold flex justify-between items-center">
                  <span className="text-indigo-600 flex items-center gap-1">
                    <UserRoundXIcon />
                    Blocked Contacts:
                    <span className="text-gray-800">{user.totalContacts}</span>
                  </span>

                  <span className="text-indigo-600 flex items-center gap-1">
                    <LucideMessagesSquare />
                    Total Inbox:
                    <span className="text-gray-800">{user.totalContacts}</span>
                  </span>
                </p>

                <p className="text-lg font-semibold flex justify-between items-center">
                  <span className="text-indigo-600 flex items-center gap-1">
                    <LucideLogIn />
                    Last Login At:
                    <span className="text-gray-800">{ConvertTime(authUser.login_at)}</span>
                  </span>

                  <span className="text-indigo-600 flex items-center gap-1">
                    <LogOutIcon />
                    Last Logout At:
                    <span className="text-gray-800">{ConvertTime(authUser.logout_at)}</span>
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Input Section */}
            <motion.div
              variants={slideDown}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Profile Pic URL
                </label>
                <input
                  type="text"
                  value={authUser.profilePicPath}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-100 text-gray-700 shadow-inner cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={authUser.fullName}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-100 text-gray-700 shadow-inner cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={authUser.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-100 text-gray-700 shadow-inner cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Joined At
                </label>
                <input
                  type="text"
                  value={ConvertTime(authUser.created_at)}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-100 text-gray-600 shadow-inner cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Links
                </label>
                {user.links.length > 0 ? (
                  <ul className="list-disc list-inside text-indigo-600 ml-0.5 space-y-1">
                    {user.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={
                            link.startsWith("http") ? link : `https://${link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:text-indigo-800 transition-all"
                        >
                          {link.replace("https://", "")}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-red-500 mt-1">
                    🚫 No links added. Please add them from{" "}
                    <span className="underline text-blue-600">Settings</span>.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
