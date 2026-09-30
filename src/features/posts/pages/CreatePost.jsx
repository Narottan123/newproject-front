import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../postSlice";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (data) => {
    setSubmitError("");
    const res = await dispatch(createPost(data));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
      setSubmitError(
        typeof res.payload === "string"
          ? res.payload
          : "Failed to create post. Please try again."
      );
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <div className="d-flex align-items-center mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm me-3">
          ← Back
        </Link>
        <h3 className="mb-0">Create New Post</h3>
      </div>

      {(submitError || error) && (
        <div className="alert alert-danger" role="alert">
          {submitError || (typeof error === "string" ? error : "An error occurred")}
        </div>
      )}

      <div className="card shadow-sm p-4 border-0 rounded-3">
        <PostForm onSubmit={handleSubmit} isSubmitting={loading} />
      </div>
    </div>
  );
};

export default CreatePost;
