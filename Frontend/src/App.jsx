import img from './assets/gradient-yellow-star-background_52683-153247.jpg'
import { useEffect, useState } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector";
import Adduser from "./components/Adduser";  // fixed casing
import Leaderboard from "./components/Leaderboard";
import { toast } from 'sonner';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("https://leaderboard-system-675b.onrender.com/user/getall");
    setUsers(res.data.users);
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("https://leaderboard-system-675b.onrender.com/user/sorted");
      if(res.data.success){
        toast.success(res.data.message);
      }
      setLeaderboard(res.data.users);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  const refreshData = async () => {
    await fetchUsers();
    await fetchLeaderboard();
  };
 
  useEffect(() => {
    refreshData();
  }, []);


  return (
    <div className="p-8 max-w-screen mx-auto min-h-screen"
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      //backgroundPosition: "center",
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
