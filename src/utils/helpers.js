export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, {
    ...defaultOptions,
    ...options,
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
