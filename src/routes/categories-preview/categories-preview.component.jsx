import { Fragment } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selector";

// import './categories-preview-preview.styles.scss'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title]
          return (
            <CategoryPreview key={title} products={products} title={title} />
          )
        })
      }
    </Fragment>

  )
}

export default CategoriesPreview