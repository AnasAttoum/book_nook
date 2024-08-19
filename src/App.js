import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './sections/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import History from './pages/History';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Header />}>
            {/* <Route index element={<Main />} /> */}
            <Route path='library' element={<Main />} />
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
