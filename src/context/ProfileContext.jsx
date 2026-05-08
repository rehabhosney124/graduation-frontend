import { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(localStorage.getItem("profileName") || "");

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedName = localStorage.getItem("profileName");

    if (savedImage) setProfileImage(savedImage);
    if (savedName) setName(savedName);
  }, []);

  const saveProfile = (image, userName) => {
    setProfileImage(image);
    setName(userName);

    localStorage.setItem("profileImage", image);
    localStorage.setItem("profileName", userName);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        name,
        saveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
