import { 
testSaga, expectSaga
} from 'redux-saga-test-plan';

import { call } from 'typed-redux-saga/macro';

import { fetchCategoriesFailed, fetchCategoriesSuccess } from '../category.action';

import { throwError } from 'redux-saga-test-plan/providers';

import { fetchCategoriesAsync,
     onFetchCategories,
    categoriesSaga
    } from '../category.saga';

import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';

import { CATEGORIES_ACTION_TYPES } from '../category.types';

    describe('Category Saga', () =>{
       
       
        test('categoriesSaga', () => {
            testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
        })


        test('onFetchCategories', ()=>{
            testSaga(onFetchCategories)
            .next()
            .takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
            .next()
            .isDone()
        })

        test('fetchCategoriesAsync success', ()=> {

            const  mockCategoriesArray = [
                {id: 1, name:'category 1'},
                {id: 2, name:'category 2'}
            ]

          return expectSaga(fetchCategoriesAsync)
        .provide([
            [call(getCategoriesAndDocuments), mockCategoriesArray ]
        ])
          .put(fetchCategoriesSuccess(mockCategoriesArray))
          .run()
        })

        test('fetchCategoriesAsync Failure', ()=> {
            const mockError = new Error('An Error occurred');

            return expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCategoriesAndDocuments), throwError(mockError)]
            ])
            .put(fetchCategoriesFailed(mockError))
            .run();
        })


    })