import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/categories.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToRemove.id
  })

  // increment if found
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(cartItem => (
    cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
  ))
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))

export const addItemToCart = (cartItems: CartItem[], cartItemToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, cartItemToAdd)
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  // setCartItems(addCartItem)
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
  // setCartItems(addCartItem)
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  return setCartItems(newCartItems)
}

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))