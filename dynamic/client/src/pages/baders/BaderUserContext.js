import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [baderId, setBaderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <UserContext.Provider value={{ baderId, setBaderId, userId, setUserId,open, setOpen,done,setDone,current, setCurrent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
