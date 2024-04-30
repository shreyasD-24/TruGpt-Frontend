import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helper/apiCommunicators";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://trugpt-backend.onrender.com/api/v1"
axios.defaults.withCredentials = true;

export const UserAuth = createContext({
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
  },
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export function userAuth() {
  return useContext(UserAuth);
}

export default function UserAuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function login(email, password) {
    let data = await loginUser(email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
    navigate("/home");
  }

  async function signup(email, password, name) {
    let data = await signupUser(name, email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
    navigate("/home");
  }

  async function logout() {
    let status = await logoutUser().catch((err) => {
      toast.error("Couldn't Log Out");
      navigate("/home");
    });
    if (status == 200) {
      setIsLoggedIn(false);
      setUser({});
      toast.success("Logged Out Succefully");
      navigate("/home");
    }
  }

  useEffect(() => {
    let checkStatus = async () => {
      let data = await checkAuthStatus();
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    };

    checkStatus().catch((err) => {
      toast.error(err.message, { id: "authenticate" });
    });
  }, []);

  return (
    <UserAuth.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </UserAuth.Provider>
  );
}
