// import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/addpost" element={<AddPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
