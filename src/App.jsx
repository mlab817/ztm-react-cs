import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/sign-in/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import PublicRoute from "./components/public-route/public-route.component";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
