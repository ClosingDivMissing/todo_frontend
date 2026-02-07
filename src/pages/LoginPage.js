import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", { username, password });
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 10);
    } catch (err) {
      setError(
        err.response?.data?.message || "خطایی رخ داد. دوباره امتحان کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">ورود به حساب</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>

          <div className="login-field">
            <label>رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="login-footer">
          حساب ندارید؟{" "}
          <Link to="/register" className="login-link">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
