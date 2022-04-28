import {
  createSelector
} from "reselect";
import {
  CategoriesState
} from "./categories.reducer";
import {
  CategoryMap
} from "./categories.types";
import {RootState} from "../store";

// cache the current value
const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// as long as the above does not change, this will not trigger
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

// as long as the above does not change, this will not trigger
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => categories.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot
    acc[title.toLowerCase()] = items
    return acc
  }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)