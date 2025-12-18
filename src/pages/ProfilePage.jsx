import { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { supabase } from "../supabase";

// profile page
// import components: write post, edit post, delete post
// import sections: publish new post (with form) | your posts (with option to edit/delete posts)

function ProfilePage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name) {
            setUserName(parsed.name);
            return;
          }
          if (parsed.user_metatdata?.name) {
            setUserName(parsed.user_metadata.name);
            return;
          }
        }

        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          const name = data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User";
          setUserName(name);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className=" bg-secondary p-2">
        <div className="h-screen bg-bg/90">
          <h1 className="text-fg text-h1 text-center   p-8">Welcome, {userName}!</h1>
        </div>
      </main>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default ProfilePage;
