import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import axios from "axios";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async (token) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://e-commerce-node-mga.herokuapp.com/api/validatetoken",
        headers: {},
        data: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data.user);
    } catch (error) {
      setUser(null);
      localStorage.clear("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser(localStorage.getItem("token"));
    }
  }, [user]);
  const DefaultContainer = () => (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path="/productos" element={<Productos user={user} />} />
        <Route
          path="/productos/category/:category"
          element={<Productos user={user} />}
        />
        <Route path="/productos/:id" element={<Detail user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders user={user} />} />
        <Route path="/orders/:id" element={<Orders user={user} />} />
      </Routes>
    </div>
  );

  return (
    <div className="container">
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="*" element={<DefaultContainer />} />
      </Routes>
    </div>
  );
}

export default App;
