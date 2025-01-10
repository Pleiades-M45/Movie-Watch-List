import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/loginpage.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext); // Use context to set user data
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle sign-up logic
      if (!username || !email || !password) {
        setError("Please fill in all fields for sign-up.");
        return;
      }

      fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setError("");
            alert("Registration successful! Please log in.");
            setIsSignUp(false);
          } else {
            setError(data.message);
          }
        })
        .catch((err) => {
          console.error("Error signing up:", err);
          setError("Sign-up failed. Please try again.");
        });
    } else {
      // Handle login logic
      if (!username || !password) {
        setError("Please enter your username or email and password.");
        return;
      }

      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setError("");
            const { role, username, userId } = data.user;

            // Update context with user data
            setUser({ username, userId, role });

            // Redirect based on role
            if (role === "admin") {
              navigate("/userhomepage");
            } else {
              navigate("/userhomepage");
            }
          } else {
            setError(data.message);
          }
        })
        .catch((err) => {
          console.error("Error logging in:", err);
          setError("Login failed. Please try again.");
        });
    }
  };

  return (
    <div className="login-container">
      <nav>
        <a href="/">
          <img className="logo-icon-abyss" src="images/aabyss.svg" alt="Abyss" />
        </a>
      </nav>
      <div className="form-wrapper">
        <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <br />
        <form onSubmit={handleFormSubmit}>
          <div className="form-control">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>{isSignUp ? "Username" : "Username or Email"}</label>
          </div>
          {isSignUp && (
            <div className="form-control">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
          )}
          <div className="form-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          <br />
          <div className="form-help">
            <div className="remember-me">
              <label>
                {isSignUp ? "Already have an account?" : "New to Abyss?"}
              </label>
            </div>
            <a
              style={{ fontWeight: "bold", color: "#8941e6", cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Sign in now" : "Sign up now"}
            </a>
          </div>
        </form>
        {error && <p align="center" style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
