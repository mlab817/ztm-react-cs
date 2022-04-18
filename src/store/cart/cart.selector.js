import { createSelector } from "reselect";

const selectCartReducer = (state) => {
  console.log('selectCartReducer triggered')
  return state.cart
}

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((count, cartItem) => (count += cartItem.quantity), 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, cartItem) => (total += cartItem.quantity * cartItem.price), 0)
)
