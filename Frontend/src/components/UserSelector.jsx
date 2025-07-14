import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const UserSelector = ({onPointsClaimed}) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/getall");
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };


    const claimPoints = async () => {
        if (!selectedUser) {
            alert("Please select a user");
            return;
        }

        const randomPoints = Math.floor(Math.random() * 10) + 1;

        try {
            const res = await axios.put(
                `http://localhost:3000/points/add/${selectedUser}`,
                { points: randomPoints }
            );

            // alert(`${res.data.user.name} claimed ${randomPoints} points!`);
            if(res.data.success){
                toast.success(`${randomPoints} ${res.data.message} to ${res.data.user.name}`);
            }

            // await fetchUsers();


            if (onPointsClaimed) {
                onPointsClaimed();
            }
        } catch (error) {
            toast.error(error.response.data.message)
            //alert(err);
        }
    };

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
            <Button  className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold border-none shadow-md transition" onClick={claimPoints}>Claim Points</Button>
        </div>
    );
};

export default UserSelector;