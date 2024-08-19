import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './sections/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import History from './pages/History';
import Home from './pages/Home';
import Book from './pages/Book';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
            <Route path='library' element={<Main />} />
            <Route path='library/:index' element={<Book />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='history' element={<History />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
