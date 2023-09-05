import { screen } from "@testing-library/react";
import Category from "../category.component";
import { renderWithProviders } from "../../../utils/__tests__/test.utils";
import Spinner from "../../../components/spinner/spinner.component";


jest.mock('react-router-dom', ()=> ({
...jest.requireActual('react-router-dom'),
useParams: ()=> ({
    category: 'mens',
})
})),



describe('Category test', ()=>{
    test('It should render a spinner if is loading is true', ()=> {
        renderWithProviders(<Category /> ,{
            preLoadState: {
                categories: {
                    isLoading: true,
                    categories: []
                }
            }
        })
        const spinnerElement = screen.getByTestId('spinner')
        expect(spinnerElement).toBeInTheDocument();
    })

    test('It should render products if isLoading is false and there are items present ', ()=> {

    
    renderWithProviders(<Category /> , {
        preLoadState: {
            categories: {
                isLoading: false,
                categories: [
                    {
                        title: 'mens',
                        items: [
                            {id: 1, name: 'product 1'},
                            {id: 2, name: 'product 2'}
                        ]
                    }
                ],
            }
        }
    })
    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();
    
    
    const product1Element = screen.getByText(/product 1/i)
    expect(product1Element).toBeInTheDocument();
})
})