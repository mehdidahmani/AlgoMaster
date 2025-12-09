import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function AppContent() {
  const location = useLocation();

  // Routes sans header/footer
  const noLayoutRoutes = ["/login", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
