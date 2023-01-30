import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import CartScreen from "./screen/CartScreen";
import LandingScreen from "./screen/LandingScreen";
import LoginScreen from "./screen/LoginScreen";
import ProductScreen from "./screen/ProductScreen";
import ProductsScreen from "./screen/ProductsScreen"
import RegisterScreen from "./screen/RegisterScreen";
function App() {
  return (
   <ChakraProvider>
    <BrowserRouter>
      <Navbar />
      <main>
      <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/products" element={<ProductsScreen />}/>
      <Route path="/cart" element={<CartScreen />}/>
      <Route path="/product/:id" element={<ProductScreen />}/>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegisterScreen />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
   </ChakraProvider>
  );
}

export default App;
