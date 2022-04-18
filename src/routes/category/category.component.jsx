import { Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import './category.styles.scss'
import ProductCard from "../../components/product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selector";

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const { category } = useParams()
  const [products, setProducts] = useState(categoriesMap[category])
  console.log('render/re-rendering category component')

  useEffect(() => {
    console.log('calling set products use effect')
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {
          products && products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Fragment>
  )
}

export default Category