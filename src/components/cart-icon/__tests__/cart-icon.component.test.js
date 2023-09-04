import {screen} from '@testing-library/react'


import { renderWithProviders } from '../../../utils/__tests__/test.utils'
import CartIcon from '../cart-icon.component'


describe('cart Icon Tests', () => {
    test('Uses preloaded state to render', () => {
        const initialCartItems = [{
            id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1
        }]

        renderWithProviders(<CartIcon />, {
            preLoadState: {
                cart: {
                    cartItems: initialCartItems
                }
            }
        })
        const cartIconElement = screen.getByText('1')
        expect(cartIconElement).toBeInTheDocument()
    })
})