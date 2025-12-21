import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

function PostsList({ limit = null, showActions = false }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [offset, setOffset] = useState(0);
  const pageSize = limit || 9;
  const [hasMore, setHasMore] = useState(true);

  const getCurrentUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  }, []);

  const loadPosts = useCallback(
    async (currentOffset, append = false) => {
      try {
        if (append) setLoadingMore(true);
        else setLoading(true);

        const from = currentOffset;
        const to = from + pageSize - 1;

        let query = supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .range(from, to);

        const { data, error } = await query;

        if (error) throw error;

        if (append) {
          setPosts((prev) => [...prev, ...(data || [])]);
        } else {
          setPosts(data || []);
        }

        setHasMore(!!data && data.length === pageSize);
        setOffset(currentOffset + pageSize);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    loadPosts(0, false);
    getCurrentUser();
  }, [loadPosts, getCurrentUser]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("author_id", currentUser?.id);

      if (error) throw error;

      loadPosts(0, false);
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete article");
    }
  };

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    loadPosts(offset, true);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-fg/50">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-fg/50">
        <p>No articles published yet.</p>
        {currentUser && <p className="mt-2">Be the first to write an article!</p>}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            showActions={showActions && currentUser?.id === post.author_id}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </div>

      {/* Load more */}
      {!limit && (
        <div className="flex justify-center mt-8">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-4 py-2 rounded-md bg-pop text-fg hover:bg-pop/80 disabled:opacity-60"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          ) : (
            <div className="text-fg/60">No more articles</div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostsList;
