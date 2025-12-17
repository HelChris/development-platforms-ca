import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import NewsFeed from "../components/ui/Newsfeed";

// Registerform page
function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header />
      </header>
      <main className="min-h-screen bg-secondary p-8">
        <h1 className="text-fg text-h1 font-family-slab font-medium max-w-3xl m-auto text-center">
          REGISTERFORM HERE
        </h1>
      </main>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}
export default RegisterPage;
