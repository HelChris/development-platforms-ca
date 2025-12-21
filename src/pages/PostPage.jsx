import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

// single post page
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPost = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error("Error loading post:", err);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="grow bg-article-bg text-fg">
        <article className="max-w-4xl mx-auto px-4 py-8 ">
          <h1 className="text-4xl font-bold mb-4 text-pop">{post.title}</h1>
          <div className="text-fg/50 mb-6">
            By {post.author_name} : {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default PostPage;
