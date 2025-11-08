// app/components/topSearchHeader.js
"use client";
import React from "react";
import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";

const TopSearchHeader = ({ userName, toggleSidebar, isSidebarOpen }) => {
  return (
    // Sticky header for persistent search and navigation
    <header className="sticky top-0 z-20 h-16 bg-gray-900/90 backdrop-blur-sm flex items-center justify-between p-4 md:p-6 lg:p-4">
      {/* Left: Menu Toggle (Hamburger) - Only visible outside of the sidebar on Lg screens */}
      {/* We use the Menu icon to toggle the sidebar */}

      {/* Center: Search Bar (Main focus, like the image) */}
      <div className="flex-grow max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search songs, albums, artists, podcasts"
            className="w-full bg-gray-800 text-white py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700"
          />
        </div>
      </div>

      {/* Right: User Profile Icon */}
      <div className="flex items-center space-x-4">
        <Link
          href={"/profile"}
          className="flex flex-col text-right text-sm leading-none"
        >
          <span className="font-semibold">{userName}</span>
          <span className="text-xs text-gray-400">View profile</span>
        </Link>
        <Link href={"/profile"}>
          <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default TopSearchHeader;
