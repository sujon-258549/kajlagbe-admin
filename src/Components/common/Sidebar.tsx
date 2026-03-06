import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faUsers,
  faBriefcase,
  faBuilding,
  faCogs,
  faToolbox,
  faIndustry,
  faChartLine,
  faSignOutAlt,
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: faTableColumns, path: "/dashboard" },
    {
      name: "User Management",
      icon: faUsers,
      path: "/users",
      submenu: [
        { name: "All Employee", path: "/employee/all" },
        { name: "Roles & Permissions", path: "/users/roles" },
      ],
    },
    {
      name: "Order Management",
      icon: faBriefcase,
      path: "/orders",
      submenu: [
        { name: "Order List", path: "/orders/list" },
        { name: "Pending Orders", path: "/orders/pending" },
      ],
    },
    {
      name: "Product Management",
      icon: faBuilding,
      path: "/products",
      submenu: [
        { name: "Product List", path: "/products/list" },
        { name: "Categories", path: "/products/categories" },
      ],
    },
    {
      name: "Materials",
      icon: faToolbox,
      path: "/materials",
      submenu: [
        { name: "Inventory", path: "/materials/inventory" },
        { name: "Suppliers", path: "/materials/suppliers" },
      ],
    },
    {
      name: "Productions",
      icon: faIndustry,
      path: "/productions",
      submenu: [
        { name: "Production Plan", path: "/productions/plan" },
        { name: "Work Orders", path: "/productions/work-orders" },
      ],
    },
    {
      name: "Sales Management",
      icon: faChartLine,
      path: "/sales",
      submenu: [
        { name: "Sales Summary", path: "/sales/summary" },
        { name: "Customer Ledger", path: "/sales/ledger" },
      ],
    },
    {
      name: "Setup Menu",
      icon: faCogs,
      path: "/setup",
      submenu: [
        { name: "General Settings", path: "/setup/general" },
        { name: "Business Setup", path: "/setup/business" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] p-4 bg-primary text-white rounded-full  active:scale-90 transition-all font-bold"
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white text-gray-600 transition-all duration-300 ease-in-out z-50 flex flex-col ${isOpen ? "w-64" : "w-20"} overflow-visible border-r border-gray-200`}
      >
        {/* Logo Section */}
        <div
          className={`h-20 flex items-center shrink-0 z-50 bg-white ${isOpen ? "px-6" : "justify-center"}`}
        >
          <img
            src={isOpen ? "/images/logo/logo.png" : "/images/logo/smLogo.png"}
            alt="Logo"
            className={`transition-all duration-300 object-contain ${isOpen ? "h-16!" : "h-10 w-10"}`}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => setActive(active === item.name ? "" : item.name)}
                className={`w-full flex items-center justify-between transition-all duration-200 group relative ${
                  active === item.name
                    ? "bg-[#e6f4ea] text-[#052e16]"
                    : "hover:bg-gray-50 text-gray-500"
                } rounded-xl px-4 py-3`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 flex justify-center transition-transform duration-300 shrink-0 ${
                      active === item.name
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-[1rem]"
                    />
                  </div>

                  <span
                    className={`ml-3 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4 absolute"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {item.submenu && isOpen && (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[0.75rem] text-gray-400 transition-transform duration-300 ${active === item.name ? "rotate-180" : ""}`}
                  />
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold  z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </button>

              {/* Submenu Rendering */}
              {item.submenu && (
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    active === item.name && isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-1"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden ml-9 space-y-1">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.name}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg transition-all"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center transition-all duration-200 group relative hover:bg-rose-50 text-rose-500 rounded-xl px-4 py-3">
            <div className="flex items-center">
              <div className="w-5 flex justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="text-[1.1rem]"
                />
              </div>
              <span
                className={`ml-3 font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 absolute"
                }`}
              >
                Logout
              </span>
            </div>

            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold  z-50 whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

