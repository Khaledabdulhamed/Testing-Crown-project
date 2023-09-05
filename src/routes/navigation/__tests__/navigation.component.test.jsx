import {screen, fireEvent} from '@testing-library/react'
import * as reactRedux from 'react-redux'
import Navigation from '../navigation.component'
import { renderWithProviders } from '../../../utils/__tests__/test.utils'
import { signOutStart } from '../../../store/user/user.action'

describe('Navigation Tests', () => {
    test('it should render a sign In Link and not a sign out if there is no current user', () => {
        renderWithProviders(<Navigation />) , {
            preLoadedState: {
                user: {
                    currentUser: null,
                }
            }
        }

       const signInLinkElement = screen.getByText(/sign in/i)
       expect(signInLinkElement).toBeInTheDocument()

       const signOutLinkElement = screen.queryByText(/sign out/i)
       expect(signOutLinkElement).toBeNull();

    })

    test('it should  render sign out and not a sign in if there is a current user', () => {
        renderWithProviders(<Navigation />), {
            preLoadedState: {
                user: {
                    currentUser: {}
                }
            }
        }

        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument()

     
    })

    test('it should not render a cart drop down if cartisopen is false', () => {
        renderWithProviders(<Navigation />), {
            preLoadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        }

        const dropDownTextElement = screen.queryByText(/your cart is empty/i)
        expect(dropDownTextElement).toBeNull();
    })

    test('it should render a cart drop down if cartisopen is true', () => {
        renderWithProviders(<Navigation / >), {
            preLoadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                }
            }
        }
        const dropDownTextElement = screen.getByText(/your cart is empty/i);
        expect(dropDownTextElement).toBeInTheDocument()
    });

    test('it should dispatch signOutStart action when clicking on the sign Out Link', async() => {
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch)
        
        renderWithProviders(<Navigation />, {
            preLoadState: {
                user: {
                    currentUser: {}
                }
            }
        } )
        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument()
       
        await fireEvent.click(signOutLinkElement)
        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(signOutStart())
        mockDispatch.mockClear();
    })


})