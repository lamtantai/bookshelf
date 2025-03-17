import { createContext, useContext } from "react";

import useUser from "../features/authentication/hooks/useUser";

// Tạo UserContext
const UserContext = createContext();

export default function UserProvider({ children }) {
  const { user, isAuthenticated, isLoading } = useUser();

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("User");
  }

  return context;
}
