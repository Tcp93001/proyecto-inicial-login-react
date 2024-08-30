import { useContext } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import Button from "../UI/Button/Button";
import styles from "./Navigation.module.css";

function Navigation() {

  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const userId = localStorage.getItem('userId')

  // Obtenemos el userId. Si existe, entonces hay que modificar la ruta para
  // que se agreguen los parámetros de usuario.
  // Esto permite a los demás componentes obtener la información del usuario,
  // como es el nombre completo.
  const loggedInRoute = userId ? `/home/${userId}` : '/home'

  return (
    <nav className={styles.nav}>
      <ul>

        <li>
          <Link to="/">Public</Link>
        </li>

        <li>
          <Link to="/gallery">Gallery</Link>
        </li>

        <li>
          <Link to={loggedInRoute}>Home</Link>
        </li>

        <li>
          {isLoggedIn ? (
            <Button onClick={onLogout} color="secondary">
              Logout
            </Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;