import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

function PostForm({ post = null, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const categories = [
    "general",
    "security",
    "education",
    "frameworks",
    "languages",
    "entertainment",
    "health",
    "frontend",
    "design",
    "backend",
    "collaboration",
    "hobby",
    "accessibility",
    "junior",
    "app",
    "podcasts",
    "events",
  ];

  useEffect(() => {
    getCurrentUser();

    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        category: post.category || "general",
      });
    }
  }, [post]);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        author_id: user?.id,
        author_email: user?.email,
        author_name: user?.user_metadata?.name || user?.email?.split("@")[0],
      };

      let result;
      if (post) {
        result = await supabase
          .from("posts")
          .update(postData)
          .eq("id", post.id)
          .eq("author_id", user?.id);
      } else {
        result = await supabase.from("posts").insert([postData]);
      }

      if (result.error) throw result.error;

      if (onSuccess) {
        onSuccess();
      }

      if (!post) {
        setFormData({
          title: "",
          content: "",
          category: "general",
        });
      }
    } catch (err) {
      console.error("Post error:", err);
      setError(err.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-secondary/10 rounded-lg p-6 shadow-md">
      <h1 className="text-h3 font-bold text-fg underline decoration-pop underline-offset-2 mb-2 md-4">
        {post ? "Edit Article" : "Write New Article"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-fg mb-1 ">
            Headline
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg bg-bg"
            placeholder="Enter article headline..."
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-fg mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg bg-bg"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-fg mb-1">
            Article Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg bg-bg"
            placeholder="Write your article..."
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-pop text-white rounded-md hover:bg-pop/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : post ? "Update Article" : "Publish Article"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostForm;
