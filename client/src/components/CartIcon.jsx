import React from 'react'
import { useAppContext } from './AppContext';
import { Link } from 'react-router-dom';

function CartIcon() {
    const { cartCount } = useAppContext();

    return (
        <Link to={"/shoppingCart"}>
            <span class="mdi mdi-shopping"> <i>{cartCount}</i> </span>
        </Link>
    )
}

export default CartIcon