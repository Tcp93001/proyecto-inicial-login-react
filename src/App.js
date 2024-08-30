import { Fragment } from "react";
// import AuthContext from "./context/AuthContext";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Public from "./components/Public/Public";
import Gallery from "./components/Gallery/Gallery";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  // const {isLoggedIn} = useContext(AuthContext);

  return (
    <Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery/*" element={<Gallery />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/home/:userId"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;