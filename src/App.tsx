import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import TshirtPage from "./Pages/TshirtPage";
import Bag from "./Pages/Bag";
import ImageDetails from "./Pages/TshirtDetails";
import Checkout from "./Pages/Checkout";
import History from "./Pages/history";
import Account from "./Pages/Account";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import FortyGodTerms from "./Pages/Terms";
import Login from "./Pages/Login";
import General from "./Pages/General";
import ContactUs from "./Pages/Contact";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="my-text min-h-screen flex flex-col">
      <Router>
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />

            <Route path="/t-shirt" element={<TshirtPage />} />
            <Route path="/new/:id" element={<ImageDetails />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/history" element={<History />} />
            
            <Route path="/terms" element={<FortyGodTerms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/general" element={<General />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
