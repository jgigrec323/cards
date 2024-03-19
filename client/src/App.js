import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import Profile from "./pages/Profile";
import { AnimatePresence } from "framer-motion";
import ShoppingCart from "./pages/ShoppingCart";
import Personnalisation from "./pages/Personnalisation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditInformations from "./pages/EditInformations";
import PrivateRoute from "./components/PrivateRoute";



// ScrollToTop.js
import { useEffect } from 'react';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the route changes
  }, [pathname]);

  return null;
};




function App() {
  const location = useLocation();


  return (
    <>
      <AnimatePresence mode="wait">
        <ScrollToTop></ScrollToTop>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Accueil />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/personnalisation" element={<PrivateRoute component={<Personnalisation />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editInformations" element={<PrivateRoute component={<EditInformations />} />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
