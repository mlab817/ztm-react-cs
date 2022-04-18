import { createSelector } from "reselect";

// cache the current value
const selectCategoryReducer = (state) => state.categories

// as long as the above does not change, this will not trigger
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

// as long as the above does not change, this will not trigger
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot
    acc[title.toLowerCase()] = items
    return acc
  }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)