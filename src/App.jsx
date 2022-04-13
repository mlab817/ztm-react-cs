import { Routes, Route } from 'react-router-dom'

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/sign-in/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "./utils/firebase/firebase.utils";

const App = () => {
  useEffect(() => {
    const getCategoriesFromFirebase = async () => {
      await getCategoriesAndDocuments()
    }
    getCategoriesFromFirebase()
  },[])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
