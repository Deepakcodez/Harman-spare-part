"use client";
import React, { useState, useEffect } from "react";
import useCurrentUser from "@/hooks/user/currentuser";
import { PuffLoader } from "react-spinners"; // Optional: for loading animation

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const { data: currentUser, isLoading } = useCurrentUser(); // Assume `useCurrentUser` has loading state
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isLoading && currentUser) {
      if (currentUser?.role === "admin") {
        setIsVerified(true);
      } else {
        window.location.href = "/";
      }
    }
  }, [currentUser, isLoading]);

  // Show loading state while checking user's role
  if (isLoading || !isVerified) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <PuffLoader size={60} color="#a78bfa" /> {/* Optional loader */}
      </div>
    );
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default AdminLayout;
