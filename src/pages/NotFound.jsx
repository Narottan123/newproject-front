import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <div className="my-5">
        <h1 className="display-1 fw-bold text-muted">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary px-4">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
