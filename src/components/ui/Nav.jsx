import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-bg shadown-md">
      <div className="px-5 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center space-x-2">
            <picture>
              <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
            </picture>
            <span className="text-h2 font-family-slab font-medium">
              <span className="text-fg">News</span>
              <span className="text-pop">Flow</span>
            </span>
          </Link>

          {/* desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-body text-fg font-medium font-family-slab capitalize hover:text-pop transition-colors"
            >
              News
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-pop text-fg hover:text-bg px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-pop text-fg hover:text-bg px-4 py-2 rounded-md font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* mobile nav */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-fg hover:text-pop focus:outline-none focus:ring-2 focus:ring-pop"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* dropdown menu*/}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-pop/50">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-fg hover:text-pop font-medium py-2"
            >
              News
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-bg hover:bg-pop text-fg px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full bg-bg hover:bg-pop text-fg px-4 py-2 rounded-md font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
