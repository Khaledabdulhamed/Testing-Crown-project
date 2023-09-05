import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/__tests__/test.utils";
import ProductCard from "../product-card.component";


describe('product card tests', ()=>{
     test('it should add the product item when product card button is clicked', async () =>{
       const mockProduct = {
        id: 1,
        imageUrl: 'test',
        name: 'item A',
        price: 10,
       }
       
       
       
      const {store} = renderWithProviders(<ProductCard  product={mockProduct}/>, {
            preLoadState: {
                cart: {
                    cartItems: []
                }
            }
        } )
        const addToCartButtonElement = screen.getByText(/add to cart/i);
        await fireEvent.click(addToCartButtonElement)
        expect(store.getState().cart.cartItems.length).toBe(1)
    })
})