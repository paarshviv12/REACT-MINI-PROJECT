import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import AuthGuard from "./components/AuthGuard";
import Home      from "./pages/Home";
import Planner   from "./pages/Planner";
import Favorites from "./pages/Favorites";
import Journal   from "./pages/Journal";
import Login     from "./pages/Login";
import Saved     from "./pages/Saved";
import Profile   from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"         element={<Home />}      />
            <Route path="/planner"  element={<AuthGuard><Planner /></AuthGuard>}   />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/journal"  element={<AuthGuard><Journal /></AuthGuard>}   />
            <Route path="/login"    element={<Login />}     />
            <Route path="/saved"    element={<Saved />}     />
            <Route path="/profile"  element={<Profile />}   />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
