import React from "react";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="/logo.png"
          alt="avatar"
          className="size-8 rounded shrink-0  shadow "
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Harman Spare Parts</span>
          <span className="text-xs block text-stone-500">Admin Panel</span>
        </div>

        
      </button>
    </div>
  );
};