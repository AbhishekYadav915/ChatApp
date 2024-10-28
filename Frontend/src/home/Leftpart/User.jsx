import React from "react";

const User = ({ user }) => {
  return (
    <div>
      <div className="flex space-x-4 px-6 py-3 my-2 hover:bg-slate-700 duration-300 cursor-pointer items-center ">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
