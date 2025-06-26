import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUserAuthStatus = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [checkUserStatus, setCheckUserStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      }
      setCheckUserStatus(false);
    });
  }, []);

  return { userLoggedIn, checkUserStatus };
};

export default useUserAuthStatus;
