import { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import UserPrivateRoute from "./component/PrivateRoute/UserPrivateRoute";

import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import DetailItem from "./pages/DetailItem";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Profile from "./pages/Profile";
import ListTransaction from "./pages/ListTransaction";
import { API, setAuthToken } from "./config/api";
import { MyContext } from "./store/Store";
import { authSuccess, authError } from "./store/actions/loginAction";
import Home from "./pages/Home";
import MyItem from "./pages/MyItem";
import AddItem from "./pages/AddItem";
import MyItemDetail from "./pages/MyItemDetail";

function App() {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const { dispatchLogin } = useContext(MyContext);

  const checkAuth = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const response = await API.get("/check-auth");
      if (response.status === 200) {
        dispatchLogin(authSuccess(response.data.token));
      }
    } catch (err) {
      localStorage.removeItem("token");
      dispatchLogin(authError());
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar setLoginForm={setLoginForm} setRegisterForm={setRegisterForm} />
      <Login
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        setRegisterForm={setRegisterForm}
      />
      <Register
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        setLoginForm={setLoginForm}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/detail/:idItem"
          element={
            <>
              <DetailItem setRegisterForm={setRegisterForm} />
            </>
          }
        />
        <Route element={<UserPrivateRoute />}>
          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route path="/transactions" element={<ListTransaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-item" element={<MyItem />} />
          <Route path="/my-item/detail/:idItem" element={<MyItemDetail />} />
          <Route path="/addItem" element={<AddItem />} />
        </Route>
        {/* <Route element={<AdminPrivateRoute />}>
          <Route path="/users" element={<ListUsers />} />
          <Route
            path="/detail-for-admin/:idItem"
            element={
              <>
                <DetailItemAdmin />
              </>
            }
          />
        </Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
