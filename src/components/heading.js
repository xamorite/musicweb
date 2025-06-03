import { Search } from "lucide-react";


const Heading = () => {
  return (
     <nav className="fixed top-0 w-[80vw]  z-50 text-white shadow-lg bg-graybackground/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button className="text-xl hover:text-gray-400">&#x276E;</button>
          <button className="text-xl hover:text-gray-400">&#x276F;</button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-searchbackground/10 rounded-full px-4 py-2">
          <Search size={18} className="mr-2" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-transparent border-none text-white outline-none text-sm w-64"
          />
        </div>
      </div>
    </nav>
  );
};

export default Heading;
