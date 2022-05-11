import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

// fallback must be synchronous
import Spinner from "./components/spinner/spinner.component";

const ProtectedRoute = lazy(() => import("./components/protected-route/protected-route.component"));
const PublicRoute = lazy(() => import("./components/public-route/public-route.component"));

const Shop = lazy(() => import("./routes/shop/shop.component"));
const Navigation = lazy(() => import( "./routes/navigation/navigation.component"));
const Home = lazy(() => import("./routes/home/home.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Authentication = lazy(() => import("./routes/sign-in/authentication.component"));

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  )
}

export default App;
