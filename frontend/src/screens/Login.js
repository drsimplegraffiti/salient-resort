import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Login = () => {
  // Local Sign In API
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInput;

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4545/login",
        userInput
      );

      setUserInput({
        email: "",
        password: "",
      });

      console.log(data);
      // set user in local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Google Sign In API

  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4545/login"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <div className="auth_container">
      <Link to="/">
        <i className="fa-sharp fa-solid fa-leaf"></i>
      </Link>
      <main>
        <h1>Salient Resort </h1>
        <p>Welcome to Salient Resort Center. Please login with your Google</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}

        <p>or</p>

        <p>Login with your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <span className="have_account">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
      </main>
    </div>
  );
};

export default Login;
