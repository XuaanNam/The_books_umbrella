import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import AdminLayout from "./layouts/AdminLayout";
import ProductList from "./pages/AdminPages/ProductList";
import CustomerList from "./pages/AdminPages/CustomerList";
import Profile from "./pages/UserPages/Profile";
import Warehouse from "./pages/AdminPages/Warehouse";
import Order from "./pages/AdminPages/Order";
import Homepage from "./pages/UserPages/Homepage";
import BookDetail from "./pages/UserPages/BookDetail";
import CartPage from "./pages/UserPages/CartPage";
import CheckOrder from "./pages/UserPages/CheckOrder";

function App() {
  return (
    <div>
      <Router>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/order" element={<Order />} />
          <Route path="/detail" element={<BookDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOrder />} />

          <Route
            path="/detail/:bookId"
            element={<BookDetail></BookDetail>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
