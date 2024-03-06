import React, { useState } from 'react';
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
interface ImageData {
  id: number;
  url: string;
  name?: string;
  tagName?: string;
  quantity?: number;
  price?: number;
}






const App: React.FC = () => {
  const [checkoutItems, setCheckoutItems] = useState<ImageData[]>([]);
  setCheckoutItems
  const [historyItems, setHistoryItems] = useState<ImageData[]>([]);

  

  const addToHistory = (item: ImageData) => {
    setHistoryItems(prevHistoryItems => [...prevHistoryItems, item]);
  };

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route
            path="/checkout"
            element={<Checkout checkoutItems={checkoutItems} addToHistory={addToHistory} userData={{
              id:2,
              first_name: 'John',
              last_name: 'Doe',
              email: 'john.doe@example.com',
              username: '1234567890',
             
            }} />}
          />
          <Route path="/history" element={<History historyItems={historyItems} />} />
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
