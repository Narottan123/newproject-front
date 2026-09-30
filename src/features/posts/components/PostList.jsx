import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../postSlice";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  const postList = Array.isArray(posts)
    ? posts
    : Array.isArray(posts?.data)
    ? posts.data
    : [];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Latest Blog Posts</h2>
        <Link to="/create" className="btn btn-primary">
          + Create Post
        </Link>
      </div>

      {loading && postList.length === 0 && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {typeof error === "string" ? error : error?.message || "Failed to load posts"}
        </div>
      )}

      {!loading && postList.length === 0 && !error && (
        <div className="text-center py-5 border rounded bg-light">
          <h4>No posts yet</h4>
          <p className="text-muted">Be the first to share your thoughts!</p>
          <Link to="/create" className="btn btn-outline-primary">
            Create First Post
          </Link>
        </div>
      )}

      <div className="row g-4">
        {postList.map((post) => (
          <div key={post._id} className="col-12 col-md-6 col-lg-4">
            <PostCard post={post} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
