import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import DpInput from "../../components/common/DpInput";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    const res = await dispatch(registerUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  const errorMessage =
    typeof error === "string" ? error : error?.message || "";

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Register</h3>

      {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <DpInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={formError.name}
        />

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

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
