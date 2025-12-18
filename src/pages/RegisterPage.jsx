import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Navigation from "../components/ui/Nav";
import Footer from "../components/ui/Footer";
import { Link } from "react-router-dom";

// create error handling component and properly handle errors?

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name || formData.email.split("@")[0], //name or extract name from email
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setSuccessMessage(
          `Welcome, ${data.user.user_metadata.name}!
          Check ${data.user.email} for confirmation.`
        );
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="max-w-md w-full space-y-8 p-8 bg-secondary/20 rounded-lg shadow-md">
          <div>
            <h1 className="text-h2 text-fg text-center font-bold">Create Account</h1>
          </div>

          {success ? (
            <div className="mt-8 space-y-6">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p className="font-semibold">Registration successfull!</p>
                <p className="text-sm mt-1">
                  {successMessage ||
                    "Please check your email to confirm your account before signing in."}
                </p>
              </div>
              <Link to="/login" className="block text-center text-pop hover:text-pop/80 underline">
                Go to Sign In
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg">
                    Name (optional)
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                    placeholder="Lois Lane"
                  />
                </div>

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
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                    placeholder="yourmail@example.com"
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
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                    placeholder="********"
                  />
                  <p className="mt-1 text-xs text-fg/50">Must be at least 6 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-fg">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-pop focus:border-pop text-fg caret-pop"
                    placeholder="*******"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pop hover:bg-pop/90 focus:outline-none focus:ring-offset-2 focus:ring-pop caret-pop cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          )}

          {!success && (
            <div className="justify-center flex gap-1 text-fg/30">
              <p className="">Already have an account?</p>
              <Link to="/login" className="underline-offset-2 underline decoration-pop">
                Sign in here.
              </Link>
            </div>
          )}
        </div>
      </div>
      <footer className="mx-auto w-full text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default RegisterPage;
