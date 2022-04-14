import { useNavigate } from 'react-router-dom'

import './cart-dropdown.styles'

import CartItem from "../cart-item/cart-item.component";

import Button from "../button/button.component";

import { CartContext } from "../../contexts/cart.context";
import {useContext} from "react";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length
            ? cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
            : (
              <EmptyMessage>
                Your cart is empty
              </EmptyMessage>
            )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown