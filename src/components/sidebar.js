import React, { useState } from "react";
import { Home, Compass, Music, User, Plus, ListMusic } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: <Home size={20} />, label: "Home" },
    { icon: <Compass size={20} />, label: "Discover" },
    { icon: <Music size={20} />, label: "Library" },
    { icon: <User size={20} />, label: "Profile" },
  ];

  const playlists = [
    "Workspace",
    "my life in a movie",
    "Main Character Energy",
    "Sad Bops",
    "Workout Thingy",
    "Childhood Dreams",
  ];

  return (
    <div
      className={`fixed  h-screen pt-8 bg-black text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[15vw]"
      } p-4 flex flex-col`}
    >
      <button
        className="flex items-center gap-2 mb-6"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Home size={20} />
        {!collapsed && <span className="text-lg font-semibold">Home</span>}
      </button>

      <nav className="flex flex-col gap-4">
        {navItems.slice(1).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div className="mt-8">
        {!collapsed && <p className="text-gray-400 text-sm mb-2">Playlists</p>}
        <div className="flex flex-col gap-2">
          {playlists.map((playlist, index) => (
            <div key={index} className="flex items-center gap-2">
              <ListMusic size={20} />
              {!collapsed && <span>{playlist}</span>}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <Plus size={20} />
            {!collapsed && <span>Create a playlist</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
