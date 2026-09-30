import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {
  const currentUser = useSelector((state) => state.auth.user);

  const authorId = post.author?._id || post.author || post.created_by;
  const isAuthor = Boolean(currentUser?._id && authorId && currentUser._id.toString() === authorId.toString());
  const authorName = post.author?.name || "Author";

  const postDate = post.created_at || post.createdAt;
  const formattedDate = postDate ? new Date(postDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "Recent";

  return (
    <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm post-card">
      <div className="position-relative">
        <img
          src={`https://picsum.photos/seed/${post._id || "blog"}/600/400`}
          alt={post.title}
          className="w-100"
          style={{ height: "200px", objectFit: "cover" }}
          loading="lazy"
        />
        <div className="overlay"></div>

        <div className="position-absolute bottom-0 p-3 text-white w-100">
          <h5 className="fw-bold mb-1 text-truncate" title={post.title}>
            {post.title}
          </h5>
          <div className="d-flex justify-content-between small opacity-75">
            <span>By {authorName}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-column justify-content-between">
        <p className="text-muted mb-3" style={{ minHeight: "3rem" }}>
          {post.content && post.content.length > 110
            ? `${post.content.slice(0, 110)}...`
            : post.content}
        </p>

        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <Link to={`/post/${post._id}`} className="btn btn-sm btn-primary">
            Read More →
          </Link>

          {isAuthor && (
            <div>
              <Link
                to={`/edit/${post._id}`}
                className="btn btn-sm btn-outline-warning me-2"
                title="Edit Post"
              >
                ✏️ Edit
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(post._id)}
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;