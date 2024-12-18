import { useEffect, useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/userSlice";
import {jwtDecode} from 'jwt-decode';

export default function LoginRegister() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [C_password, setC_Password] = useState("");
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const user = useSelector((state) => state.user.user);
  const err = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: Username, password }));
    event.target.reset()
  }
  const handleSignUp = (event) => {
    event.preventDefault();
    dispatch(registerUser({ email, password, displayName: Name, Username }));
    event.target.reset()
  }
  // const parseJwt=(token) {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload);
  // }
  useEffect(() => {
    if (user) {
      if(jwtDecode(token).role="Admin") navigate("/admin");
      else navigate("/client");
    }
  }, [user]);
  return (
    <div className={`form-container ${isActive ? "active" : ""}`}>
      <form className="sign-in" onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={Username} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <a href="#" className="forget-password">
          Forgot Your Password?
        </a>
        <button type="submit">Sign In</button>
      </form>

      <form className="sign-up" onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={Name} />
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={Username} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setC_Password(e.target.value)} value={C_password} />
        <div className="terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I accept the Terms of Use & Privacy Policy.
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-right">
            <h1>Hi!</h1>
            <p>
              Want to be a user? Sign up with your details to unlock all the
              features and start using the site.
            </p>
            <button id="register" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>
          <div className="toggle-left">
            <h1>Welcome Back!</h1>
            <p>
              Already a user? Sign in to access all the features and continue
              where you left off
            </p>
            <button onClick={() => setIsActive(false)}>Log In</button>
          </div>
        </div>
      </div>

      {err && <h1 className="bg-red-500 p-5 text-cyan-50">{message}</h1>}
    </div>
  );
}
