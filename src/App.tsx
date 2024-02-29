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
import { Account } from './Pages/Account';
import Footer from './Pages/footer';
import  PrivacyPolicy  from './Pages/privacyPolicy';
interface ImageData {
  id: number;
  url: string;
  name?: string;
  tagName?: string;
  quantity?: number;
  price?: number;
}



interface BagItem {
  id: number;
  url: string;
  tagName?: string;
  name?: string;
  quantity: number;
  price?: number;
}


const App: React.FC = () => {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<ImageData[]>([]);
  const [historyItems, setHistoryItems] = useState<ImageData[]>([]);

  const addToBag = (item: ImageData) => {
    const existingItemIndex = bagItems.findIndex(bagItem => bagItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedBagItems = [...bagItems];
      updatedBagItems[existingItemIndex].quantity++;
      setBagItems(updatedBagItems);
    } else {
      setBagItems(prevBagItems => [...prevBagItems, { id: item.id, name: item.name, url: item.url, quantity: 1 }]);
    }

    // Update checkoutItems state with the added item
    setCheckoutItems(prevCheckoutItems => [...prevCheckoutItems, item]);
  };

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
            element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />}
          />
          <Route path="/Option2" element={<Option2 />} />
          <Route
            path="/Option2/:id"
            element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />}
          />
          <Route path="/Option3" element={<Option3 />} />
          <Route
            path="/Option3/:id"
            element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />}
          />
          <Route
            path="/Bag"
            element={<Bag bagItems={bagItems.map(item => ({ id: item.id, name: item.name, url: item.url, tagName: '' }))} />}
          />
          {/* Pass userData as prop to Checkout component */}
          <Route
            path="/checkout"
            element={<Checkout checkoutItems={checkoutItems} addToHistory={addToHistory} userData={{
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              password: 'password123',
              phoneNumber: '1234567890'
            }} />}
          />
          <Route path="/history" element={<History historyItems={historyItems} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
