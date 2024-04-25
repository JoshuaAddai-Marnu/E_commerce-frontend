
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopCategory } from './Pages/ShopCategory';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import store from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import ShopContextProvider from './Context/ShopContext';
import CartContextProvider from './Context/CartContext';
import Checkout from './Components/Checkout/Checkout';


function App() {
  return (
    <Provider store={store}>
      <ShopContextProvider>
        <CartContextProvider>
          <Toaster />
          <div >
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path='/' element={<Shop />} />
                <Route path='/category/:categoryName' element={<ShopCategory banner={men_banner} />} />
                <Route path="product" element={<Product />}>
                  <Route path=':productId' element={<Product />} />
                </Route>
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<LoginSignup />} />
                <Route path='/checkout' element={<Checkout />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </div>
        </CartContextProvider>
      </ShopContextProvider>
    </Provider>
  );
}

export default App;
