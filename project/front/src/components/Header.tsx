import { Code2, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path:String) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/courses", label: "Cours" },
    { path: "/exercises", label: "Exercices" },
    { path: "/about", label: "À propos" },
  ];

  return (
    <header className="bg-gray-50 shadow-xl sticky top-0 z-50 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300"
          >
            <Code2 className="w-10 h-10 text-blue-600 group-hover:text-green-600 transition-colors" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              AlgoMaster
            </span>
          </Link>

          {/* NAV DESKTOP CENTRÉ */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${
                    isActive(link.path)
                      ? "bg-blue-800 text-white"
                      : "text-gray-800 hover:bg-green-600 hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex items-center space-x-2">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user.Prenom} {user.Nom}
                </span>
                <Link
                  to="/profile"
                  className={`
                    px-5 py-2 rounded-lg font-semibold transition-all
                    border border-gray-300
                    ${
                      isActive("/profile")
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-green-600 hover:text-white"
                    }
                  `}
                >
                  Mon Profil
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="px-5 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-all flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Se connecter
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-lg font-semibold border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* MENU MOBILE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-md font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-green-600 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* AUTH BUTTONS MOBILE */}
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">
                    {user.Prenom} {user.Nom}
                  </p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-center px-4 py-3 rounded-lg font-semibold border
                    ${
                      isActive("/profile")
                        ? "bg-green-600 text-white"
                        : "bg-white border-gray-300 hover:bg-green-600 hover:text-white"
                    }
                  `}
                >
                  Mon Profil
                </Link>
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await logout();
                    navigate("/login");
                  }}
                  className="w-full px-4 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
                >
                  Se connecter
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 rounded-lg font-semibold border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
