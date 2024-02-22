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
interface ImageData {
  id: number;
  url: string;
  name: string;
  tagName?: string;
}

interface BagItem {
  id: number;
  url: string;
  name: string;
  quantity: number;
}

const App: React.FC = () => {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<ImageData[]>([]); // Define checkoutItems state

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
  
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/Option1" element={<Option1 />} />
          <Route path="/Option1/:id" element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />} />
          <Route path="/Option2" element={<Option2 />} />
          <Route path="/Option2/:id" element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />} />
          <Route path="/Option3" element={<Option3 />} />
          <Route path="/Option3/:id"  element={<ImageDetails addToBag={addToBag} checkoutItems={checkoutItems} />} />
          <Route path="/Bag" element={<Bag bagItems={bagItems.map(item => ({ id: item.id, name: item.name, url: item.url, tagName: '' }))} />} />
          <Route
            path="/checkout"
            element={<Checkout checkoutItems={checkoutItems} />} // Pass checkoutItems as prop to Checkout component
          />        
        <Route path="/history" element={<History checkoutItems={checkoutItems} />} />
      

        </Routes>

      </Router>
    </>
  );
}

export default App;
