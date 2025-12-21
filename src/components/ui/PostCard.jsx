import { Link } from "react-router-dom";

function PostCard({ post, showActions = false, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: "#94a3b8", // Slate-400
      security: "#f87171", //  Red-400
      education: "#fbbf24", //  Amber-400
      frameworks: "#a78bfa", // Violet-400
      languages: "#60a5fa", // Blue-400
      entertainment: "#f472b6", // Pink-400
      health: "#86efac", // Green-300
      frontend: "#67e8f9", // Cyan-300
      design: "#c084fc", // Purple-400
      backend: "#fb923c", // Orange-400
      collaboration: "#4ade80", // Green-400
      hobby: "#fde047", // Yellow-300
      accessibility: "#2dd4bf", // Teal-400
      junior: "#bef264", // Lime-300
      app: "#818cf8", // Indigo-400
      podcasts: "#f9a8d4", // Pink-300
      events: "#fca5a5", // Red-300
    };
    return colors[category] || "#6b7280";
  };

  // for preview
  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength).trim() + "...";
  };

  return (
    <article className="bg-bg border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Category badge */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-bg"
            style={{ backgroundColor: getCategoryColor(post.category) }}
          >
            {post.category?.toUpperCase() || "GENERAL"}
          </span>

          {/* Actions for post owner */}
          {showActions && (
            <div className="flex gap-2">
              <Link
                to={`/edit-post/${post.id}`}
                className="text-yellow-500 hover:text-yellow-300 text-sm"
              >
                Edit
              </Link>
              <button onClick={onDelete} className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Headline */}
        <Link to={`/post/${post.id}`}>
          <h2 className="text-2xl font-bold text-fg mb-2 hover:text-pop transition-colors max-w-fit text-balance">
            {post.title}
          </h2>
        </Link>

        {/* Article Preview */}
        <p className=" text-pop/90 mb-4 leading-relaxed grow">{truncateContent(post.content)}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-fg/70 mb-4">
          <div className="flex items-center gap-2 pb-2">
            <span> By {post.author_name || "Anonymous"}</span>
            <span> : </span>
            <time>{formatDate(post.created_at)}</time>
          </div>
        </div>
        <div className="flex justify-end mt-auto">
          <Link
            to={`/post/${post.id}`}
            className="bg-pop text-fg hover:bg-pop/50 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
