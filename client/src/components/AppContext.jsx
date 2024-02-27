import React, { createContext, useContext, useState } from 'react';

// Create a context for your provider
const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
    // Define your states here
    const cards = [
        { cardName: "Silver", bgColor: "#7575750f", cardColor: "#939393", price: 299000 },
        { cardName: "White", bgColor: "#000", cardColor: "#fff", price: 259000 },
        { cardName: "Black", bgColor: "#7575750f", cardColor: "#000", price: 199000 },
        { cardName: "Gold", bgColor: "#000", cardColor: "#E3CC00", price: 350000 }
    ];
    const [selectedCard, setSelectedCard] = useState({ color: null, price: null, name: null, bg: null });
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [isCommandClicked, setIsCommandClicked] = useState(false);
    const [savedData, setSavedData] = useState(null);


    // Define functions to update the states
    const updateCartCount = (count) => {
        setCartCount(count);
    };

    const addToCart = (card) => {
        setSelectedCard(card);

        const existingItem = cartItems.find((item) => item.name === card.name);

        if (existingItem) {
            // If the item is already in the cart, update the quantity
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.name === card.name ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            setCartItems((prevItems) => [...prevItems, { ...card, quantity: 1 }]);
        }

        updateCartCount(cartCount + 1);
    };

    const removeFromCart = (card) => {

        setCartItems((prevItems) => prevItems.filter((item) => item !== card));
        updateCartCount(cartCount - card.quantity);
    };

    const updateItemQuantity = (card, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.name === card.name ? { ...item, quantity } : item
            )
        );

        // Calculate total quantity of items in the updated cart items
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        console.log(totalQuantity)
        // Update the cart count with the total quantity
        updateCartCount(totalQuantity);
    };


    const handleOnCommand = (card) => {
        setSelectedCard(card);
        setIsCommandClicked(true);
    };
    const saveUserDatas = (datas) => {
        setSavedData(datas)
    }

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    // Provide the states and functions to the children components
    return (
        <AppContext.Provider value={{
            isCommandClicked, setIsCommandClicked,
            selectedCard, handleOnCommand, cartCount, user, addToCart,
            removeFromCart, updateCartCount, updateItemQuantity, login, logout,
            cards, cartItems, saveUserDatas, savedData, setSavedData
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
