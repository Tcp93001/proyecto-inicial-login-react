import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card/Card";
import styles from "./Home.module.css";

const BASE_URL = 'https://react-http-b9402-default-rtdb.firebaseio.com/'; // process.env.BASE_URL

function Home() {
  const {userId} = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const { isLoading, error, request } = useHttp();

  useEffect(() => {
    const fetchUser = async () => {
      const userNumber = localStorage.getItem('userId');
      if (!userNumber) {
        navigate('login', {replace: true})
        return
      }

      const url = `${BASE_URL}users.json?orderBy="$key"&equalTo="${userId}"`;
      const data = await request({ url });

      setUser({
        first_name: data[userId]?.first_name,
        last_name: data[userId]?.last_name,
        email: data[userId]?.email,
      });

    }

    fetchUser();

  }, [request, userId, navigate]);

  const errorMessage = <h2>{error}</h2>

  const loadingMessage = <h2>Cargando...</h2>

  return (
    <Card className={styles.home}>
      {isLoading && loadingMessage}
      {error && errorMessage}
      {!isLoading && !error && (
        <>
          <h1>¡Bienvenido!</h1>
          <h2>
            {user?.first_name} {user?.last_name}
          </h2>
        </>
      )
    }
    </Card>
  );
}

export default Home;