// source/pages/index.js
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import useFetchTracks from "../hooks/useFetchTracks";
import Sidebar from "../components/sidebar";
import { Search } from "lucide-react";
import NewArrival from "../components/newArrival";
import SectionBar from "../components/sectionBar";
import HomePage from "./home";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { tracks, loading, error } = useFetchTracks();

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user is logged in.");
    }
  }, [user]);

  return (
    <div className="flex text-white min-h-screen">
      <HomePage/>
    </div>
  );
};

export default Home;
