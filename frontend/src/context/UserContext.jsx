import React, { useState, createContext, useContext } from 'react';

// Create the Context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userRole: 'customer',
    userImage: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
