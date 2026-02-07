import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/todos")
      .then((res) => {
        console.log(res.data);
        if (res.data.message.length > 0) {
          setUser(true);
          setUsername(res.data.username);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    api.post("/auth/logout");
    setUser(null);
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          لیست کار
        </Link>
        {username && (
          <div className="navbar-username">خوش آمدی، {username}!</div>
        )}

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="navbar-link">
                ورود
              </Link>
              <Link to="/register" className="navbar-link register">
                ثبت‌نام
              </Link>
            </>
          ) : (
            <button onClick={logout} className="navbar-logout">
              خروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
