import {
  all,
  call
} from 'typed-redux-saga/macro'

import {
  categoriesSaga
} from "./categories/categories.saga";

import {
  userSagas
} from "./user/user.saga";

// generator functions use yield to run multiple await functions
export function* rootSaga() {
  yield* all([
    call(categoriesSaga),
    call(userSagas)
  ])
}