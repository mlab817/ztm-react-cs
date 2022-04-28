import { Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import './category.styles'
import ProductCard from "../../components/product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";
import {CategoryContainer, CategoryTitle} from "./category.styles";

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  const { category } = useParams()
  const [products, setProducts] = useState(categoriesMap[category])
  console.log('render/re-rendering category component')

  useEffect(() => {
    console.log('calling set products use effect')
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {
        isLoading
         ? <Spinner />
         : (
           <CategoryContainer>
            {
              products && products.map(product => <ProductCard key={product.id} product={product} />)
            }
          </CategoryContainer>
          )
      }

    </Fragment>
  )
}

export default Category