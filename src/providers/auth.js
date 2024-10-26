"use client"
import { checkLoggedIn } from "@/lib/auth";
import React, { useState, useEffect } from "react";
import { AuthContext } from "@/context/auth";
import { logout } from "@/lib/auth";
import { addUserToDatabase } from "@/lib/db/addNewUser";

async function addUser(user){
  await addUserToDatabase(user);
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, IsMounted] = useState(false);
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  useEffect(() => {
    IsMounted(true);
    const fetchUser = async () => {
      const user = await checkLoggedIn();
      if (user?.error) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);
      
 
    };

    fetchUser();
  }, [mounted]);

  if (user && !loading) {
    addUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading,handleLogout,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
