import { createContext, ReactNode, useEffect, useState } from "react";

// Define the shape of the context value
interface UserContextType {
  userID: string | null;
  setUserID: (id: string) => void;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userID, setUserID] = useState<string | null>(() => {
    // Read the initial value from localStorage
    return localStorage.getItem("userID");
  });

  useEffect(() => {
    // Store the userID in localStorage whenever it changes
    if (userID) {
      localStorage.setItem("userID", userID);
    } else {
      localStorage.removeItem("userID");
    }
  }, [userID]);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};
