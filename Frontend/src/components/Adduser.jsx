import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Component for adding a new user to the leaderboard
const Adduser = ({ refreshUsers }) => {
  const [name, setName] = useState("");

  // Function to handle adding a user
  const addUser = async () => {

    try {
        // Send a POST request to the backend to add the user
      const res = await axios.post("https://leaderboard-system-675b.onrender.com/user/add", { name });
      if (res.data.success) {
        // Show a success toast notification
        toast.success(`${res.data.message}: ${name}`);
      }
      setName("");    // Clear the input field
      refreshUsers(); // Refresh the user list in the parent component
    } catch (error) {
      // Show an error toast if the request fails
      toast.error(error.response.data.message)
    }



  };

  return (
    <div className="flex gap-2 my-4">
      <div className="flex gap-2 w-100 justify-center items-center">
      <div>
      <Input
        className=" w-50 border-2 border-black lg:w-100"
        placeholder="New user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div>
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold border-none shadow-md transition" onClick={addUser}>Add user</Button>
      </div>
      </div>
     
      
    </div>
  );
};

export default Adduser;
