import { useState } from "react";

const CommentForm = ({ onSubmit, isSubmitting = false }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ content: text.trim() });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        className="form-control"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <div className="d-flex justify-content-end mt-2">
        <button
          type="submit"
          className="btn btn-primary btn-sm px-3"
          disabled={isSubmitting || !text.trim()}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
