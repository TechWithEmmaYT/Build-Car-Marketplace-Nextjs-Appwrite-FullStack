"use client";

import useCurrentUser from "@/hooks/api/use-current-user";
import React, { createContext, useContext } from "react";

type UserType = {
  name: string;
  email: string;
};

type AuthContextType = {
  user?: UserType;
  error: any;
  isPending: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    error,
    isPending,
    isFetching,
    refetch,
  } = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{ user, error, isFetching, isPending, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const conext = useContext(AuthContext);
  if (!conext) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return conext;
};
