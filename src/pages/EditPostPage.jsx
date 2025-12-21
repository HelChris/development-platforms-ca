import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import PostForm from "../components/ui/PostForm";
import { supabase } from "../supabase";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Missing post id");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error("Load post error:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSuccess = () => {
    navigate(`/post/${id}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="grow bg-bg">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center text-fg/60">Loading post...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <PostForm post={post} onSuccess={handleSuccess} onCancel={handleCancel} />
          )}
        </div>
      </main>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default EditPostPage;
