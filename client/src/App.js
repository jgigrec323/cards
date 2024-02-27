import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import Profile from "./pages/Profile";
import { AnimatePresence } from "framer-motion";
import ShoppingCart from "./pages/ShoppingCart";
import Personnalisation from "./pages/Personnalisation";


function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/produits" element={<Produits />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/personnalisation" element={<Personnalisation />}></Route>

        </Routes>
      </AnimatePresence>
    </>

  );
}

export default App;
