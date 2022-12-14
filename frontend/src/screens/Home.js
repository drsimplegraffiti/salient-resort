import React from "react";

const Home = ({ user }) => {
  return (
    <div className="container">
        <div className="user__profile">
        <h1>Welcome {user?.email.split("@")[0]}</h1>
        {user?.picture && <img src={user?.picture} alt="user" />}

        {user?.firstName && <p>First Name: {user?.firstName}</p>}
        {user?.lastName && <p>Last Name: {user?.lastName}</p>}
        {user?.email && <p>Email: {user?.email}</p>}

        {/* hide secret key using eye*/}
        {user?.token && <p>Token: {user?.token.slice(0, 10)}...</p>}
      </div>
    </div>
  );
};

export default Home;
