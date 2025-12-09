import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

          {/* BOUTON PROFIL */}
          <Link
            to="/profile"
            className={`
              px-5 py-2 rounded-lg font-semibold transition-all
              border border-gray-300
              ${
                isActive("/profile")
                  ? "bg-green-600 text-white" // reste vert
                  : "bg-white hover:bg-green-600 hover:text-white"
              }
            `}
          >
            Mon Profil
          </Link>

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

            {/* PROFIL MOBILE */}
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
          </div>
        )}
      </nav>
    </header>
  );
}
