import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../auth/authService";
import Navigation from "../components/ui/Nav";
import Footer from "../components/ui/Footer";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //call API here
      // const response = await fetch('/api/login', {...} )

      // for demo; check if fields are filled
      if (formData.email && formData.password) {
        // simulate API response
        const userData = {
          email: formData.email,
          name: formData.email.split("@")[0], //extract name from email
          id: Date.now().toString(),
        };

        //save to local storage
        authService.login(userData);

        //redirect to home
        navigate("/");

        //force navigation component to re-render
        window.dispatchEvent(new Event("storage"));
      } else {
        setError("Please fill inn all fields");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); //clear error when user types
  };

  return (
    <div className="">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center  bg-bg">
        <div className="max-w-md w-full space-y-8 p-8 bg-secondary/20 rounded-lg shadow-md">
          <div>
            <h2 className="text-h2 text-fg text-center font-bold">Sign In</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">{error}</div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-fg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-fg">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                  placeholder="*********"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pop hover:bg-pop/90 focus:outline-none focus:ring-offset-2 focus:ring-pop caret-pop cursor-pointer"
            >
              Sign In
            </button>
          </form>
          <div className="justify-center flex gap-1 text-fg/30">
            <p className="">Don't have an account?</p>
            <Link to="/register" className="underline-offset-2 underline decoration-pop">
              Register here.{" "}
            </Link>
          </div>
        </div>
      </div>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default LoginPage;
