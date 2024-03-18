import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Pages/Navbar';
import { Home } from './Pages/Home';
import Option1 from './Pages/Option1';
import Option2 from './Pages/Option2';
import Option3 from './Pages/Option3';
import Bag from './Pages/Bag';
import ImageDetails from './Pages/ImageDetails';
import Checkout from './Pages/checkout';
import History from './Pages/history';
import Account  from './Pages/Account';
import Footer from './Pages/footer';
import PrivacyPolicy from './Pages/privacyPolicy';
import FortyGodTerms from './Pages/terms';
import MyComponent from './Pages/MyComponent';
import Login from './Pages/Modal';








const App: React.FC = () => {
 

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/account" element={<Account />} />
          <Route path="/Option1" element={<Option1 />} />
          <Route
            path="/Option1/:id"
            element={<ImageDetails addToBag={function (): void {
              throw new Error('Function not implemented.');
            } } checkoutItems={[]} />}
          />
          <Route path="/Option2" element={<Option2 />} />
          <Route
            path="/Option2/:id"
            element={<ImageDetails addToBag={function (): void {
              throw new Error('Function not implemented.');
            } } checkoutItems={[]} />}
          />
          <Route path="/Option3" element={<Option3 />} />
          <Route
            path="/Option3/:id"
            element={<ImageDetails addToBag={function (): void {
              throw new Error('Function not implemented.');
            } } checkoutItems={[]}  />}
          />
          <Route
            path="/Bag"
            element={<Bag  />}
          />
        <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History/>} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<FortyGodTerms />} />
          <Route path="/com" element={<MyComponent />} />


        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
