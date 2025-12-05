import Header from "./components/ui/Header";
import Feed from "./sections/home/Feed";
import Newsletter from "./sections/home/Newsletter";
import Contact from "./sections/home/Contact";
import Footer from "./components/ui/Footer";

function App() {
  return (
    <>
      <main>
        <Header />
        <Feed />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
