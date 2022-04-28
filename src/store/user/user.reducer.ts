import { USER_ACTION_TYPES } from "./user.types";
import {UserData} from "../../utils/firebase/firebase.utils";

import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess
} from './user.action'
import {AnyAction} from "redux";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false
    }
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    };
  }

  if (signInFailed.match(action)
    || signOutFailed.match(action)
    || signUpFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    }
  }

  return state
}