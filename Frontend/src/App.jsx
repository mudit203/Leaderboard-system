import img from './assets/gradient-yellow-star-background_52683-153247.jpg'
import { useEffect, useState } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector";
import Adduser from "./components/Adduser";  // fixed casing
import Leaderboard from "./components/Leaderboard";
import { toast } from 'sonner';

function App() {
    // State to hold all users, the selected user, and the leaderboard
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);


    // Fetch all users from the backend
  const fetchUsers = async () => {
    const res = await axios.get("https://leaderboard-system-675b.onrender.com/user/getall");
    setUsers(res.data.users);
  };


  // Fetch the sorted leaderboard from the backend
  const fetchLeaderboard = async () => {
    try {
      // Show a toast notification when the leaderboard is refreshed
      const res = await axios.get("https://leaderboard-system-675b.onrender.com/user/sorted");
      if(res.data.success){
        toast.success(res.data.message);
      }
      setLeaderboard(res.data.users);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };
// Refresh both users and leaderboard data
  const refreshData = async () => {
    await fetchUsers();
    await fetchLeaderboard();
  };
 

  // Fetch data when the component mounts
  useEffect(() => {
    refreshData();
  }, []);


  return (
    <div className="p-8 max-w-screen mx-auto min-h-screen"
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
     
      backgroundAttachment: "fixed"
    }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard System</h1>
      <div className='flex flex-col items-center justify-center '>
      <UserSelector 
        users={users} 
        selectedUser={selectedUser} 
        setSelectedUser={setSelectedUser}
        onPointsClaimed={refreshData}
      
      />
      <Adduser refreshUsers={refreshData} />
      </div>
     
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;
