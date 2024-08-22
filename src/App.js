import { useContext } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import AuthContext from "./context/AuthContext";

function App() {
  const {isLoggedIn} = useContext(AuthContext);
  // Solo me falto eliminar el AuthContext.Provide que tenía aqui
  return (
    // <AuthContext.Provider>
    <>
      <Header />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </>
    // </AuthContext.Provider>
  );
}

export default App;