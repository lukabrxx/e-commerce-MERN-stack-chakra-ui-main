import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import CartScreen from "./screen/CartScreen";
import ProductsScreen from "./screen/ProductsScreen"
function App() {
  return (
   <ChakraProvider>
    <BrowserRouter>
      <Navbar />
      <main>
      <Routes>
      <Route path="/products" element={<ProductsScreen />}/>
      <Route path="/cart" element={<CartScreen />}/>
      </Routes>
      </main>
    </BrowserRouter>
   </ChakraProvider>
  );
}

export default App;
