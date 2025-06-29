import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const UserMainContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const AxiosPublic = useAxiosPublic();

  // Handle Registration
  const handleRegisterEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Handle Login
  const handleLoginEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Handle Google Provider
  const handleGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Handle Logout
  const handleLogout = () => {
    setLoading(true);
    return AxiosPublic.post("/logout")
      .then(() => {
        signOut(auth);
      })
      .then(() => {
        toast.warn(`Logout Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName);
        setImage(currentUser.photoURL);
        setPhone(currentUser.phoneNumber);
        // get token and store it via httpOnly cookie
        const userInfo = { email: currentUser.email };
        AxiosPublic.post("/jwt", userInfo).catch((err) =>
          console.error("JWT token fetch failed:", err)
        );
      } else {
        setUser(null);
        setName("");
        setImage("");
        setPhone(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [AxiosPublic]);

  //  compressed names
  const contextNames = {
    user,
    setUser,
    name,
    setName,
    image,
    setImage,
    phone,
    setPhone,
    loading,
    handleRegisterEmailPassword,
    handleLoginEmailPassword,
    handleGoogle,
    handleLogout,
  };
  return (
    <UserMainContext.Provider value={contextNames}>
      {children}
    </UserMainContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserContext;
