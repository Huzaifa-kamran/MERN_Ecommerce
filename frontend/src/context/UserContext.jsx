import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // Use `null` initially for proper loading checks

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token); 
        if (!decoded?.id) {
          throw new Error('Invalid token payload');
        }

        const { data } = await axios.get(`http://localhost:5000/auth/user/${decoded.id}`);
        console.log(data)
        const {_id, userName, userEmail, userRole, userImage } = data;
        setUser({_id, userName, userEmail, userRole, userImage });
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
