import { useState } from "react";
import { Link } from "react-router";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const notifications = [
  {
    id: 1,
    name: "Terry Franci",
    avatar: "/images/user/user-02.jpg",
    project: "Project - Nganter App",
    time: "5 min ago",
    status: "success",
  },
  {
    id: 2,
    name: "Alena Franci",
    avatar: "/images/user/user-03.jpg",
    project: "Project - Nganter App",
    time: "8 min ago",
    status: "success",
  },
  {
    id: 3,
    name: "Jocelyn Kenter",
    avatar: "/images/user/user-04.jpg",
    project: "Project - Nganter App",
    time: "15 min ago",
    status: "success",
  },
  {
    id: 4,
    name: "Brandon Philips",
    avatar: "/images/user/user-05.jpg",
    project: "Project - Nganter App",
    time: "1 hr ago",
    status: "error",
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (notifying) setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full h-11 w-11 hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={toggleDropdown}
      >
        {notifying && (
          <span className="absolute right-0 top-0.5 h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
          </span>
        )}
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 2.292C10.75 1.878 10.414 1.542 10 1.542s-0.75 0.336-0.75 0.75v0.544C6.083 3.207 3.625 5.9 3.625 9.167v5.292H3.333C2.919 14.459 2.583 14.795 2.583 15.209S2.919 15.959 3.333 15.959h1.042h11.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75H16.375V9.167c0-3.267-2.458-5.96-5.625-6.331V2.292zM14.875 14.459V9.167C14.875 6.475 12.692 4.292 10 4.292S5.125 6.475 5.125 9.167v5.292h9.75zM8 17.708c0 0.415 0.336 0.75 0.75 0.75h2.5c0.414 0 0.75-0.335 0.75-0.75s-0.336-0.75-0.75-0.75h-2.5c-0.414 0-0.75 0.335-0.75 0.75z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute right-0 mt-3 w-80 max-h-[480px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h5>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col overflow-y-auto custom-scrollbar">
          {notifications.map((note) => (
            <DropdownItem
              key={note.id}
              onItemClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <div className="relative w-10 h-10">
                <img
                  src={note.avatar}
                  alt={note.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-[1.5px] border-white ${
                    note.status === "success"
                      ? "bg-green-500 dark:border-gray-900"
                      : "bg-red-500 dark:border-gray-900"
                  }`}
                ></span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {note.name}
                  </span>{" "}
                  requests permission to change{" "}
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {note.project}
                  </span>
                </span>
                <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {note.time}
                </span>
              </div>
            </DropdownItem>
          ))}
        </ul>

        <Link
          to="/"
          className="block p-3 text-center text-sm font-medium text-gray-700 bg-gray-50 border-t border-gray-100 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
