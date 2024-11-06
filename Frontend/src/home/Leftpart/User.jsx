import React from "react";
import useConversation from "../../components/zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
console.log(isOnline)
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-6 py-3 my-2 cursor-pointer items-center">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              alt={`${user.fullname}'s profile`}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
