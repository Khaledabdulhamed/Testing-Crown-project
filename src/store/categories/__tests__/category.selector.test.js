import { screen } from "@testing-library/react";

import {
selectCategories,
selectCategoriesIsLoading,
selectCategoriesMap
} from '../category.selector';

const mockState = {
    categories: {
        isLoading: false,
        categories: [{
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
        }]
    }
}

describe('Category Selectors', () => {
    
    
    test('selectCategories should return the categoriesData', () => {
        const categoriesSlice = selectCategories(mockState);
        expect(categoriesSlice).toEqual(mockState.categories.categories)   
    })
    
    test('selectCategoriesIsLoading should return isLoading state', () => {
        const isLoading = selectCategoriesIsLoading(mockState);
        expect(isLoading).toEqual(false);
    })

    test('selectCategoriesMap should convert the items array into the appropriate map', () => {
        const expectedCategoriesMap = {
            mens: [
                {id: 1, name: 'product 1'},
                {id: 1, name: 'product 1'}
            ],
            women: [
                {id: 3, name: 'product 3'},
                {id: 4, name: 'product 4'}
            ]
        }
        const categoriesMap = selectCategoriesMap(mockState)
        expect(categoriesMap).toEqual(expectedCategoriesMap)
    })

} )