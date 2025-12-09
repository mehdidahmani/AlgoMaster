import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
      //  localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirection selon le rôle
        if (data.user.role === "etudiant") navigate("/");
        else navigate("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-300 p-4">
      <div className="bg-gray-200 shadow-xl rounded-xl w-full max-w-md p-8 relative">
        <h1 className="text-2xl font-bold mb-2 text-center">Connexion</h1>
        <p className="text-gray-500 text-center mb-6">
          Accédez à votre espace personnel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Adresse Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              placeholder="Votre mot de passe sécurisé"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Nouveau sur la plateforme ?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
