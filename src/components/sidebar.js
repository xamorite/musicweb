
import React, { useState } from "react";
import { Home, Compass, Music, User, Plus, ListMusic } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/router';


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const navItems = [
    { icon: <Home size={20} />, label: "Home", ref: "/" },
    { icon: <Compass size={20} />, label: "Discover", ref: "/discover" },
    { icon: <Music size={20} />, label: "Library", ref: "/library" },
    { icon: <User size={20} />, label: "Profile", ref: "/profile" },
  ];

  const playlists = [
    "Workspace",
    "my life in a movie",
    "Main Character Energy",
    "Sad Bops",
    "Workout Thingy",
    "Childhood Dreams",
  ];

  const goToHome = () => {
    router.push("/"); // Navigates to home page
  };

  return (
    <div
      className={`fixed  h-screen pt-8 bg-black text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-[15vw]"
      } p-4 flex flex-col`}
    >
      <button
        className="flex items-center gap-2 mb-6"
        onDoubleClick={() => setCollapsed(!collapsed)}
        onClick={goToHome}
      >
        <Home size={20} />
        {!collapsed && <span className="text-lg font-semibold">Home</span>}
      </button>

      <nav className="flex flex-col gap-4">
        {navItems.slice(1).map((item, index) => (
          <Link href={item.ref}>
           
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </div>
            
          </Link>
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
