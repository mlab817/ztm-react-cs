import { createSelector } from "reselect";

const selectCartReducer = (state) => {
  console.log('selectCartReducer triggered')
  return state.cart
}

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => {
    console.log('selectIsCartOpen triggered')
    return cart.isCartOpen
  }
)

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => {
    console.log('selectCartItems triggered')
    return cart.cartItems
  }
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    console.log('selectCartCount triggered')
    return cartItems.reduce((count, cartItem) => (count += cartItem.quantity), 0)
  }
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    console.log('selectCartTotal triggered')
    return cartItems.reduce((total, cartItem) => (total += cartItem.quantity * cartItem.price), 0)
  }
)
