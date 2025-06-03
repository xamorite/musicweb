import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex bg-graybackground text-white min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`transition-all duration-300 flex-1 overflow-x-hidden ${
          collapsed ? "ml-20" : "ml-[15vw]"
        } p-6`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
