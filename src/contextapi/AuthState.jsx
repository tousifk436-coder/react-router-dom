import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authContext = createContext(null);

function AuthState({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem("user"))) || []
  );

  const signupFun = (data) => {
    console.log(data);
    let newData = [...user, data];
    setUser(newData);
    localStorage.setItem("user", newData);
    
    navigate("/login");
    toast.success("Your account created successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const loginFun = (data) => {
    console.log(data);
    console.log(user);
  };

  return (
    <authContext.Provider value={{ user, setUser, signupFun, loginFun }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuth = () => {
  const auth = useContext(authContext);
  return auth;
};
