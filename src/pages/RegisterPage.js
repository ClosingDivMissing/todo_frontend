import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", { username, password });
      setSuccess("ثبت‌نام با موفقیت انجام شد! در حال انتقال به صفحه ورود...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "خطایی رخ داد. دوباره امتحان کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">ثبت‌نام</h2>

        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-field">
            <label>نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              minLength="3"
              required
            />
          </div>

          <div className="register-field">
            <label>رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="حداقل ۶ کاراکتر"
              minLength="6"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className="register-footer">
          قبلاً ثبت‌نام کردید؟{" "}
          <Link to="/login" className="register-link">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
