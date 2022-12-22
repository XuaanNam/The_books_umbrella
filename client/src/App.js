import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./pages/AdminPages/AdminLayout";
import CustomerList from "./pages/AdminPages/CustomerList";
import Profile from "./pages/UserPages/Profile";
import Warehouse from "./pages/AdminPages/Warehouse";
import Order from "./pages/AdminPages/Order";
// import Homepage from "./pages/UserPages/Homepage";
import BookDetail from "./pages/UserPages/BookDetail";
import CartPage from "./pages/UserPages/CartPage";
import CheckOrder from "./pages/UserPages/OrderInfo";
import Homepage from "./pages/UserPages/Homepage";
import OrderMethod from "./pages/UserPages/OrderMethod";
import CompleteOrder from "./pages/UserPages/CompleteOrder";
import AddProduct from "./pages/AdminPages/AddProduct";

function App() {
  return (
    <div>
      <Router>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/admin/:adminpage" element={<AdminLayout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail" element={<BookDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/step1" element={<CheckOrder />} />
          <Route path="/checkout/step2" element={<OrderMethod />} />
          <Route path="/complete" element={<CompleteOrder />} />
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
