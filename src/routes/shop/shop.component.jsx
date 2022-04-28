import {lazy, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

const CategoriesPreview = lazy(() => import("../categories-preview/categories-preview.component"));

const Category = lazy(() => import("../category/category.component"));

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop