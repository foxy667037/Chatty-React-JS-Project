import { Link, useLocation } from "react-router";
import propTypes from "prop-types";
import { Loader2 } from "lucide-react";

export const SideBarItems = ({
  expanded,
  icon,
  text,
  onClick,
  isLogginingOut,
  id,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLogout = id === "logout";
  const normalizedPath = id.startsWith("/") ? id : `/${id}`;
  const active = !isLogout && currentPath === normalizedPath;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Link
      {...(!isLogout ? { to: normalizedPath } : { to: "/" })}
      onClick={handleClick}
      className={`relative flex items-center py-1 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
      active
          ? "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-600"
          : "hover:bg-blue-100 text-gray-700"
      } ${expanded ? "justify-start" : "justify-center"}`}
    >
      {isLogginingOut && isLogout ? (
        <>
          <div className="flex items-center justify-center h-10">
            <Loader2 className="animate-spin" />
          </div>
          <span
            className={`overflow-hidden transition-all ml-3 ${
              expanded ? "w-40" : "w-0"
            }`}
          >
            Loading...
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center h-10">{icon}</div>
          <span
            className={`overflow-hidden transition-all ml-3 ${
              expanded ? "w-40" : "w-0"
            }`}
          >
            {text}
          </span>
        </>
      )}

      {!expanded && !isLogginingOut && (
        <div
          className={`absolute w-auto left-full rounded-md px-2 py-1 ml-6 bg-indigo-200 text-indigo-600 text-sm opacity-0 -translate-x-3 pointer-events-none transition-all group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </Link>
  );
};

SideBarItems.propTypes = {
  id: propTypes.string,
  icon: propTypes.node,
  onClick: propTypes.func,
  expanded: propTypes.bool,
  isLogginingOut: propTypes.bool,
  text: propTypes.string.isRequired,
};
