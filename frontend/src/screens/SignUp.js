import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    picture: "",
  });

  const { email, password, firstName, lastName } = userInput;

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4545/signup",
        userInput
      );
console.log(data.message);
      if (data.error) {
        alert(data.error);
      } else {

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4545/signup"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        theme: "filled_black",
        text: "continue_with",
        shape: "pill",
      });

      google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  return (
    <div className="auth_container">
      <Link to="/">
        <i className="fa-sharp fa-solid fa-leaf"></i>
      </Link>
      <main>
        <h1>Salient Resort</h1>
        <p>Welcome to Salient Resort Center. Please sign up with your Google</p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}

        <p>or</p>

        <p>Sign up with your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
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
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <span className="have_account">
          Already have an account? <a href="/login">Login</a>
        </span>
      </main>
    </div>
  );
};

export default SignUp;
