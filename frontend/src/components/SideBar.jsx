import { createContext, useState } from "react";
import {
  LogOut,
  Settings,
  MessageCircle,
  User,
  Users,
  BarChart2,
  UserCircle,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SideBarItems } from "./SideBarItems.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const SideBarContext = createContext();

export const SideBar = () => {
  const [expanded, setExpanded] = useState(false);
  const { authUser, logoutUser, isLogginingOut } = useAuthStore();

  const mainItems = [
    { id: "/", icon: <MessageCircle size={20} />, text: "Chats" },
    { id: "contacts", icon: <User size={20} />, text: "Contacts" },
    { id: "status", icon: <Activity size={20} />, text: "Status" },
    { id: "groups", icon: <Users size={20} />, text: "Groups" },
    { id: "report", icon: <BarChart2 size={20} />, text: "Report" },
  ];

  const bottomItems = [
    { id: "profile", icon: <UserCircle size={20} />, text: "Profile" },
    { id: "setting", icon: <Settings size={20} />, text: "Setting" },
    {
      id: "logout",
      icon: <LogOut size={20} />,
      text: "Logout",
      onClick: () => {
        logoutUser();
      },
    },
  ];

  return (
    <SideBarContext.Provider value={{ expanded }}>
      <div className="flex">
        <aside className="h-full">
          <nav className="h-full flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 pb-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <img
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                  src={authUser.profilePicPath}
                />
                <div
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-44" : "w-0"
                  }`}
                >
                  <div className="leading-4">
                    <h4 className="font-semibold text-sm bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent animate-pulse">
                      {authUser.fullName}
                    </h4>
                    <span className="text-xs text-transparent bg-gradient-to-r from-neutral-700 to-neutral-800 bg-clip-text hover:underline cursor-pointer">
                      {authUser.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Items */}
            <ul className={`flex-1 px-3 mt-3 overflow-visible`}>
              {mainItems.map((item) => (
                <SideBarItems
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  text={item.text}
                  expanded={expanded}
                />
              ))}
            </ul>

            {/* Bottom Items */}
            <div className="px-3 mb-3">
              <hr className="my-3 border-t border-gray-200" />
              {bottomItems.map((item) => (
                <SideBarItems
                  key={item.id}
                  icon={item.icon}
                  text={item.text}
                  id={item.id}
                  onClick={() => {
                    item.onClick?.();
                  }}
                  expanded={expanded}
                  isLogginingOut={isLogginingOut}
                />
              ))}
            </div>
          </nav>
        </aside>

        {/* Collapse Button */}
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className={`relative ${
            expanded ? "-left-4 top-14" : "-left-4 top-18"
          } bg-white border border-gray-300 shadow-md w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all hover:text-indigo-600`}
        >
          <span className="text-sm text-center text-gray-700">
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </span>
        </button>
      </div>
    </SideBarContext.Provider>
  );
};
