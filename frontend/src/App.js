import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Landing, Login, Signup, Home } from "./screens";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        {!user?.email ? <Navbar /> : <Navbar user={user} />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={user?.email ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user?.email ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/home"
            element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
