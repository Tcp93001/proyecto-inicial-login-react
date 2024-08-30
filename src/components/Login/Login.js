import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Login.module.css";
import AuthContext from "../../context/AuthContext";

function emailReducer(state, action) {
  switch(action.type) {
    case 'UPDATE_EMAIL':
      return { value: action.payload, isValid: action.payload.includes('@')}
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.includes("@")};

    default:
      return { value: '', isValid: false }
  }
}

function Login() {
  const {onLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';
  console.log('from login', from)

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const initialState = {
    value: '',
    isValid: null,
  }

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(password.trim().length > 6 && emailState.isValid)
    }, 500);

    return () => {
      clearTimeout(timer)
    }
  }, [emailState.isValid, password])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'UPDATE_EMAIL', payload: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, (userId) => {
      console.log('login userId', userId);
      console.log('from ONLOGIN', from)
      if( from === '/home') from = `${from}/${userId}`
      navigate(from, { replace:true });
    })
    // onLogin(emailState.value, password);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;