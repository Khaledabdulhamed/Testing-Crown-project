import {
    categoriesReducer,
    CATEGORIES_INITIAL_STATE
} from '../category.reducer';

import {
fetchCategoriesStart,
fetchCategoriesSuccess,
fetchCategoriesFailed,
} from '../category.action'

describe('Category Reducer tests', () => {
   
    test('fetchCategoriesStart', () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true,
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState)
    })

    test('fetchCategoriesSuccess', () => {
        const mockData = [
            {
                title: 'mens',
                imageUrl: 'test',
                items: [
                    {id: 1, name: 'product 1'},
                    {id: 1, name: 'product 1'}
                ]
            },
            {
                title: 'women',
                imageUrl: 'test 2',
                items: [
                    {id: 3, name: 'product 3'},
                    {id: 4, name: 'product 4'}
                ]
            }
        ]
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(expectedState)
    })

    test('fetchCategoriesFaild', () => {
        const mockError = new Error('Error Fetching Categories');
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState)
    })
})