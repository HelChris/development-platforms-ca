import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import NewsFeed from "../components/ui/Newsfeed";

// single post page when user clicks an article
function PostPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="grow">
        <h1 className="text-fg flex items-center m-auto bg-bg size-60">POST PAGE</h1>
      </main>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default PostPage;
