import { useState, useEffect } from "react";
import DpInput from "../../../components/common/DpInput";

const PostForm = ({ onSubmit, initialData = {}, isSubmitting = false }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        title: initialData.title || "",
        content: initialData.content || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.content.trim()) errs.content = "Content is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DpInput
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter a catchy title..."
        error={errors.title}
      />

      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className={`form-control ${errors.content ? "is-invalid" : ""}`}
          name="content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your blog post content here..."
        />
        {errors.content && (
          <div className="invalid-feedback">{errors.content}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Submit Post"}
      </button>
    </form>
  );
};

export default PostForm;
