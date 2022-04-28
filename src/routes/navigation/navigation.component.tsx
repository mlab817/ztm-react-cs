import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinksContainer } from "./navigation.styles";

import {selectCurrentUser} from "../../store/user/user.selector";

import {selectIsCartOpen} from "../../store/cart/cart.selector";

import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutHandler = async () => {
    dispatch(signOutStart())
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {
            currentUser
              ? <NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>
              : <NavLink to="/auth">SIGN IN</NavLink>
          }
          <CartIcon />
        </NavLinksContainer>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation