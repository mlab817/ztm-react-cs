import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Preview,
  Title
} from "./category-preview.styles";

import {FC} from "react";
import {CategoryItem} from "../../store/categories/categories.types";

type CategoryPreviewProps = {
  title: string
  products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={`/shop/${title}`}>
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {
          products
            .filter((_, index) => index < 4)
            .map(product => <ProductCard key={product.id} product={product} />)
        }
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview