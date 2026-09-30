import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost, updatePost, clearSinglePost } from "../postSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singlePost, loading, error } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.auth.user);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
    return () => {
      dispatch(clearSinglePost());
    };
  }, [dispatch, id]);

  const post = singlePost?.data !== undefined ? singlePost.data : singlePost;

  const handleUpdate = async (data) => {
    setSubmitError("");
    const res = await dispatch(updatePost({ id, data }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/post/${id}`);
    } else {
      setSubmitError(
        typeof res.payload === "string"
          ? res.payload
          : "Failed to update post."
      );
    }
  };

  if (loading && !post) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading post details...</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          {typeof error === "string" ? error : "Post not found or failed to load."}
        </div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // Author check
  const authorId = post.author?._id || post.author || post.created_by;
  if (currentUser?._id && authorId && currentUser._id.toString() !== authorId.toString()) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          You are not authorized to edit this post.
        </div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <div className="d-flex align-items-center mb-3">
        <Link to={`/post/${id}`} className="btn btn-outline-secondary btn-sm me-3">
          ← Back
        </Link>
        <h3 className="mb-0">Edit Post</h3>
      </div>

      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}

      <div className="card shadow-sm p-4 border-0 rounded-3">
        <PostForm onSubmit={handleUpdate} initialData={post} isSubmitting={loading} />
      </div>
    </div>
  );
};

export default EditPost;
