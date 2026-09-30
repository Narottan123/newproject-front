import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../commentSlice";
import CommentForm from "./CommentForm";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const handleAdd = async (data) => {
    const res = await dispatch(addComment({ postId, data }));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchComments(postId));
    }
  };

  const commentList = Array.isArray(comments)
    ? comments
    : Array.isArray(comments?.data)
    ? comments.data
    : [];

  return (
    <div className="mt-2">
      <h4 className="fw-bold mb-3">Comments ({commentList.length})</h4>

      <CommentForm onSubmit={handleAdd} isSubmitting={loading} />

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {typeof error === "string" ? error : "Failed to load comments"}
        </div>
      )}

      {commentList.length === 0 && !loading && (
        <div className="text-center py-4 text-muted border rounded-3 mt-3 bg-light">
          No comments yet. Start the conversation!
        </div>
      )}

      <div className="mt-4 d-flex flex-column gap-3">
        {commentList.map((c, i) => {
          const commentDate = c.created_at || c.createdAt;
          const formattedDate = commentDate
            ? new Date(commentDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <div key={c._id || i} className="p-3 bg-light rounded-3 border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-dark">
                  👤 {c.user_name || c.user_email || "Anonymous User"}
                </span>
                {formattedDate && (
                  <small className="text-muted">{formattedDate}</small>
                )}
              </div>
              <p className="mb-0 text-secondary" style={{ whiteSpace: "pre-line" }}>
                {c.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
