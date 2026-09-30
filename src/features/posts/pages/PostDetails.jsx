import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost, deletePost, clearSinglePost } from "../postSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import CommentList from "../../comments/components/CommentList";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singlePost, loading, error } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePost(id));
    }
    return () => {
      dispatch(clearSinglePost());
    };
  }, [dispatch, id]);

  const post = singlePost?.data !== undefined ? singlePost.data : singlePost;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await dispatch(deletePost(id));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    }
  };

  if (loading && !post) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading post...</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          {typeof error === "string" ? error : "Post not found or could not be loaded."}
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

  const authorId = post.author?._id || post.author || post.created_by;
  const isAuthor = Boolean(currentUser?._id && authorId && currentUser._id.toString() === authorId.toString());
  const authorName = post.author?.name || "Author";

  const postDate = post.created_at || post.createdAt;
  const formattedDate = postDate
    ? new Date(postDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          ← Back to Posts
        </Link>

        {isAuthor && (
          <div>
            <Link to={`/edit/${id}`} className="btn btn-outline-warning btn-sm me-2">
              ✏️ Edit Post
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger btn-sm">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      <article className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        <img
          src={`https://picsum.photos/seed/${id}/900/400`}
          alt={post.title}
          className="w-100"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />

        <div className="card-body p-4">
          <h1 className="fw-bold mb-3">{post.title}</h1>

          <div className="d-flex align-items-center text-muted small mb-4 pb-3 border-bottom">
            <span>Posted by <strong>{authorName}</strong></span>
            {formattedDate && <span className="ms-3">• {formattedDate}</span>}
          </div>

          <div className="post-content" style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
            {post.content}
          </div>
        </div>
      </article>

      <div className="card border-0 shadow-sm rounded-4 p-4">
        <CommentList postId={id} />
      </div>
    </div>
  );
};

export default PostDetails;
