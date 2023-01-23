import { createContext, useEffect, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // user
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const response = sessionStorage.getItem('user');
      setUser( JSON.parse(response));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logout function
  function logout() {
    sessionStorage.clear();
    setUser(null);
  }

  // check if user is logged in
  const isLoggedIn = () => {
    return !!sessionStorage.getItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
