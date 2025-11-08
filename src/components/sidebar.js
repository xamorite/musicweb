// app/components/sidebar.js
"use client";
import React from "react";
import { Home, Compass, BookOpen, Crown, Menu, X } from "lucide-react"; // Import X icon
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar, isSidebarOpen }) => {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", icon: Home, href: "/home" },
    { name: "Explore", icon: Compass, href: "/explore" },
    { name: "Library", icon: BookOpen, href: "/library" },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay: Hides content when sidebar is open on mobile */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        // Add click handler to close the sidebar when clicking the overlay
        onClick={toggleSidebar} 
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black/95 backdrop-blur-md text-white z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          transform lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-gray-800/50">
           <button 
                  onClick={toggleSidebar}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                  {/* On Desktop (lg): Show Menu for toggling. 
                     On Mobile (below lg): Show X (close) when open, or nothing when closed.
                  */}
                  {isOpen && (<X className="w-6 h-6 lg:hidden" />)} 
                  {/* Show Menu only on desktop */}
                  {!isOpen && (<Menu className="w-6 h-6 hidden lg:block" />)}
                  {isOpen && (<Menu className="w-6 h-6 hidden lg:block" />)}
                  
                </button>
          {isOpen && (
            <span className="ml-3 text-xl font-semibold">Expression</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
           {/* ... (Navigation Items remain the same) */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 mb-2 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
                // Close sidebar on mobile after navigating
                onClick={toggleSidebar}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-white" : ""}`}
                />
                {isOpen && (
                  <span className="ml-4 font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Section */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="border-t border-gray-800/50 pt-4 mb-4" />
          <Link
            href="/upgrade"
            className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 
              hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-lg 
              transition-all duration-200 shadow-lg hover:shadow-red-500/25"
            // Close sidebar on mobile after navigating
            onClick={toggleSidebar}
          >
            <Crown className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="ml-3 font-semibold">Upgrade Pro</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;