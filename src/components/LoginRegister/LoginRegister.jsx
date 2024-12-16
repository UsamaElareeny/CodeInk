import { useState } from "react";
import "./LoginRegister.css";

export default function LoginRegister() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`form-container ${isActive ? "active" : ""}`}>
      <form className="sign-in">
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#" className="forget-password">
          Forgot Your Password?
        </a>
        <button type="button">Sign In</button>
      </form>

      <form className="sign-up">
        <h1>Create Account</h1>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <div className="terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I accept the Terms of Use & Privacy Policy.
          </label>
        </div>
        <button type="button">Sign Up</button>
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
    </div>
  );
}
