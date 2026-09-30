import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import DpInput from "../../components/common/DpInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formError[e.target.name]) {
      setFormError({ ...formError, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    const res = await dispatch(loginUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  const errorMessage =
    typeof error === "string" ? error : error?.message || "";

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>

      {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <DpInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formError.email}
        />

        <DpInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formError.password}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
