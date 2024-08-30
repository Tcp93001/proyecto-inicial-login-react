import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: () => {}
});

const BASE_URL = 'https://react-http-b9402-default-rtdb.firebaseio.com/'; // process.env.BASE_URL

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (isAuthenticated === "1") setIsLoggedIn(true);

  }, []);

  const fetchUser = async (email) => {
    const url = `${BASE_URL}users.json?orderBy="email"&equalTo="${email}"`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Algo salió mal');

    return response.json();
  }

  const loginHandler = async (email, callback) => {
    try {
      const user = await fetchUser(email);
      const userId = Object.keys(user)[0];

      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);

      return callback(userId);
    } catch (error) {
      console.log('error --- >  ', error.message)
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
