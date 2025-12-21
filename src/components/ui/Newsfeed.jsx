import { useState } from "react";
import PostForm from "./PostForm";
import PostsList from "./PostsList";

function NewsFeed({ showWriteForm = true }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePostSuccess = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
    setSuccessMessage("Article published successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-fg mb-2">Let The News Flow</h1>
        <p className="text-fg/60">Nothing like updated news...</p>
      </div>

      {/* success message */}
      {successMessage && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}

      {/* Write article btn/form */}
      {showWriteForm && (
        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-pop text-white rounded-md hover:bg-pop/90"
            >
              Write New Article
            </button>
          ) : (
            <PostForm onSuccess={handlePostSuccess} onCancel={() => setShowForm(false)} />
          )}
        </div>
      )}

      {/* Posts List */}
      <PostsList key={refreshKey} showActions={true} />
    </div>
  );
}

export default NewsFeed;
