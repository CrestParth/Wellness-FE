import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImg") || "",
  );

  return (
    <ProfileContext.Provider value={{ profileImg, setProfileImg }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
