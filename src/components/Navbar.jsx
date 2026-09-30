import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3 py-2 shadow-sm">
      <div className="container-fluid">
        <Link to={token ? "/dashboard" : "/login"} className="navbar-brand fw-bold">
          ✍️ BlogPlatform
        </Link>

        <div className="d-flex align-items-center gap-2">
          {token ? (
            <>
              {user?.name && (
                <span className="text-light me-2 small d-none d-sm-inline">
                  Welcome, <strong>{user.name}</strong>
                </span>
              )}
              <Link to="/dashboard" className="btn btn-outline-light btn-sm">
                Posts
              </Link>
              <Link to="/create" className="btn btn-success btn-sm">
                + Create Post
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
