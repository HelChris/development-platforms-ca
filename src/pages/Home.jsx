import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import PostsList from "../components/ui/PostsList";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="grow bg-bg">
        <div className="min-h-full">
          <PostsList limit={5} showActions={false} />
        </div>
      </main>
      <footer className="w-full text-center mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
