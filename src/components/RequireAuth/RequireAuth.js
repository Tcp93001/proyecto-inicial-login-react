import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

function RequireAuth({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login', {replace: true, state: {from: location}})
    }
  }, [navigate, isLoggedIn, location]);

  return children;
}

export default RequireAuth;