import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import NewsFeed from "../components/ui/Newsfeed";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="">
        <div className="bg-bg">
          <NewsFeed />
        </div>
      </main>
      <footer className="w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
