import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
const TypeSend = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return; // Prevent sending empty messages
    await sendMessages(message);
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 outline-none px-4 py-3 w-full  mt-1 bg-transparent rounded-xl "
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
};

export default TypeSend;
