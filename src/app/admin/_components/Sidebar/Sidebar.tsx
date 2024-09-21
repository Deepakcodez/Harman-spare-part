import React from "react";
import { AccountToggle } from "./AccountToggle";

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <div>
          <h1>create</h1>
          <h1>create</h1>
          <h1>create</h1>
          <h1>create</h1>
        </div>
      </div>

    </div>
  );
};
