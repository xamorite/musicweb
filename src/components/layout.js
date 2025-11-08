import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`transition-all duration-300 flex-1 overflow-x-hidden  p-6`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
