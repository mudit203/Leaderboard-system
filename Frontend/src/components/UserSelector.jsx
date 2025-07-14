import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";


// Component for selecting a user and claiming random points for them
const UserSelector = ({onPointsClaimed}) => {

    // State to hold the list of users and the currently selected user
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
     

     // Fetch the list of users from the backend
    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://leaderboard-system-675b.onrender.com/user/getall");
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

   // Function to claim random points for the selected user
    const claimPoints = async () => {
        if (!selectedUser) {
            alert("Please select a user");
            return;
        }

        // Generate a random number of points between 1 and 10
        const randomPoints = Math.floor(Math.random() * 10) + 1;

        try {
            // Send a PUT request to add points to the selected user
            const res = await axios.put(
                `https://leaderboard-system-675b.onrender.com/points/add/${selectedUser}`,
                { points: randomPoints }
            );

          // Show a success toast if the operation was successful
            if(res.data.success){
                toast.success(`${randomPoints} ${res.data.message} to ${res.data.user.name}`);
            }

           

        // Notify the parent component to refresh leaderboard data
            if (onPointsClaimed) {
                onPointsClaimed();
            }
        } catch (error) {
            toast.error(error.response.data.message)
         
        }
    };


    // Fetch users when the component mounts or when the users list changes
    useEffect(() => {
        fetchUsers();
    }, [users]);

    return (
        <div className="my-4 flex items-center gap-4">
            <Select onValueChange={setSelectedUser} value={selectedUser} >
                <SelectTrigger className="w-[200px] border-2 border-black">
                    <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                    {users.map(user => (
                        <SelectItem key={user._id} value={user._id}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button  className="bg-black hover:bg-yellow-700 text-white font-bold border-none shadow-md transition" onClick={claimPoints}>Claim Points</Button>
        </div>
    );
};

export default UserSelector;