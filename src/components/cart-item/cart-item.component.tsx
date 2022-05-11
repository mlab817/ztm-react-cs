import { FC, memo } from "react";
import { CartItem as TCartItem } from "../../store/cart/cart.types";

import './cart-item.styles'

import {CartItemContainer, ItemDetails, ItemDetailsContent} from "./cart-item.styles";

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <ItemDetails>
        <ItemDetailsContent>{name}</ItemDetailsContent>
        <ItemDetailsContent>{quantity} x ${price}</ItemDetailsContent>
      </ItemDetails>
    </CartItemContainer>
  )
})

export default CartItem