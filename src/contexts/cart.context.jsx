import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cart item contains productToAdd
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === productToAdd.id
  })

  // increment if found
  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    })
  }

  // return new array
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToRemove.id
  })

  // increment if found
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(cartItem => (
    cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  ))
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
})

export const CART_ACTION_TYPES = {
  'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN',
  'SET_CART_ITEMS': 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_IS_CART_OPEN':
      return {
        ...state,
        isCartOpen: payload
      }
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartProvider = ({ children }) => {
  const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => (total += cartItem.quantity), 0)

    const newCartTotal = newCartItems.reduce((total, cartItem) => (total += cartItem.quantity * cartItem.price), 0)

    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      })
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (productToRemove) => {
    // setCartItems(addCartItem)
    const newCartItems = removeCartItem(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (productToRemove) => {
    // setCartItems(addCartItem)
    const newCartItems = clearCartItem(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,

  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}