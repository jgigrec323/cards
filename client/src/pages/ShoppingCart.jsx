import React, { useEffect } from 'react';
import { useAppContext } from '../components/AppContext';
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const { cartItems, updateItemQuantity, removeFromCart, cards, isCommandClicked, setIsCommandClicked, updateCartCount } = useAppContext();

    const formatPrice = (price) => {
        return price.toLocaleString('fr-FR', { minimumFractionDigits: 0 });
    };

    // Function to calculate the total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const card = cards.find((c) => c.cardName === item.name);
            return total + parseFloat(card.price) * item.quantity;
        }, 0);
    };
    const calculateTotalFormatted = () => {
        const total = calculateTotal();
        return formatPrice(total);
    };

    useEffect(() => {
        setIsCommandClicked(false);
        if (isCommandClicked) {
            window.document.body.style.overflowY = "hidden"
        }
        else {
            window.document.body.style.overflowY = "scroll"
        }

    }, [])


    // Function to handle increasing item quantity
    const handleIncreaseQuantity = (item) => {
        const newQuantity = item.quantity + 1;
        updateItemQuantity(item, newQuantity);

    };

    // Function to handle decreasing item quantity
    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateItemQuantity(item, newQuantity);

        }
    };

    return (
        <main className="shoppingCart">
            <h1>Ma Carte</h1>
            <div className="cartItems">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th id='product'>Produit</th>
                            <th id='quantity'>Quantité</th>
                            <th id='price'>Prix Unitaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => {
                                const card = cards.find((c) => c.cardName === item.name);
                                return (
                                    <tr key={index}>
                                        <td><input type="checkbox" /></td>
                                        <td className='cardCell'>
                                            <div className="card" style={{ background: card.cardColor }}></div>
                                            <div className='cardInfos'>
                                                <h5 className="cardName">{card.cardName}</h5>
                                            </div>
                                        </td>
                                        <td className='qtyCell'>
                                            <div className="counter">
                                                <span className="decrement" onClick={() => handleDecreaseQuantity(item)}>
                                                    -
                                                </span>
                                                <span className="quantity">{item.quantity}</span>
                                                <span className="increment" onClick={() => handleIncreaseQuantity(item)}>
                                                    +
                                                </span>
                                            </div>
                                            <div className="remove" onClick={() => removeFromCart(item)}>
                                                <span className="mdi mdi-trash-can-outline"></span>
                                                <span>Supprimer</span>
                                            </div>
                                        </td>
                                        <td className='priceCell'>{formatPrice(card.price)} GNF</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">Votre panier est vide</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td colSpan="2" className='totalCellText'>Total</td>
                            <td className='totalCellPrice'> {calculateTotalFormatted()} GNF</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='btnOrderDiv'>
                <button className="Btn submitOrder">{cartItems.length > 0 ? <Link to={"/personnalisation"}>Commander</Link> : "Commander"}</button>
            </div>
            <button className="addAnother"><Link to={"/produits"}>Ajouter une carte</Link></button>
        </main>
    );
}

export default ShoppingCart;
