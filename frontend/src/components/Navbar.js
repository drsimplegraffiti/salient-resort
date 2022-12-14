import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <i className="fa-sharp fa-solid fa-leaf"></i>
        </Link>
        <nav className="navbar">
          <div className="links">
            {user ? (
              <>
                <p
                  style={{
                    display: "inline-block",
                    margin: "0 1rem",
                    width: "50px",
                    height: "50px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "50px",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    to="/home"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {user?.email?.split("")[0].toUpperCase()}
                  </Link>
                </p>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup">SignUp</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
