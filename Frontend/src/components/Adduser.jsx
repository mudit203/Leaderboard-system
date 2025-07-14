import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Adduser = ({ refreshUsers }) => {
  const [name, setName] = useState("");

  const addUser = async () => {

    try {
      const res = await axios.post("https://leaderboard-system-675b.onrender.com/user/add", { name });
      if (res.data.success) {
        toast.success(`${res.data.message}: ${name}`);
      }
      setName("");
      refreshUsers();
    } catch (error) {
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
