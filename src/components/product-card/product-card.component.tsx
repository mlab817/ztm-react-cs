import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addItemToCart} from "../../store/cart/cart.action";

import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";

import {Footer, Name, Price, ProductCardContainer} from './product-card.styles'

import {selectCartItems} from "../../store/cart/cart.selector";

import {CategoryItem} from "../../store/categories/categories.types";

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()

  const { name, price, imageUrl } = product

  const cartItems = useSelector(selectCartItems)

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button onClick={addProductToCart} buttonType={BUTTON_TYPES_CLASSES.inverted}>Add to Cart</Button>
    </ProductCardContainer>
  )
}

export default ProductCard