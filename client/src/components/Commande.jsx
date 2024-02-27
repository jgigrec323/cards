import React from 'react'
import transition from '../js/transition'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from './AppContext';
import CartIcon from './CartIcon';

function Commande() {
    const { selectedCard, setIsCommandClicked, addToCart } = useAppContext();
    const handleOnClose = () => {
        setIsCommandClicked(false);
    }
    const handleOnAddToCart = (e) => {
        e.preventDefault()
        addToCart(selectedCard)
        toast.success("Carte ajoutée au panier !")
    }
    return (
        <section className="commande" style={{ background: selectedCard.bg, color: selectedCard.color }} >
            <span className="mdi mdi-close" onClick={() => handleOnClose()}></span>
            <CartIcon></CartIcon>
            {selectedCard === null ||
                <div className="left">
                    <h2 className='cardName'>{selectedCard.name}</h2>
                    <p className="price">{selectedCard.price} GNF</p>
                    {/* <form action="#">
                        <input type="text" style={{ borderColor: selectedCard.color, color: selectedCard.color }} className="nomClient" placeholder='Nom' />
                        <input type="text" style={{ borderColor: selectedCard.color, color: selectedCard.color }} className="prenomClient" placeholder='Prénom(s)' />
                        <input type="tel" style={{ borderColor: selectedCard.color, color: selectedCard.color }} className="phoneNumber" placeholder='Numéro de téléphone' />
                        <input type="email" style={{ borderColor: selectedCard.color, color: selectedCard.color }} className="email" placeholder='Email' />
                        <div className="entite">
                            <div>
                                <label htmlFor="entite">Personnel</label>
                                <input style={{ accentColor: selectedCard.color }} type="radio" name="entite" id="" />
                            </div>
                            <div>
                                <label htmlFor="entite">Business</label>
                                <input style={{ accentColor: selectedCard.color }} type="radio" name="entite" id="" />
                            </div>
                            <div>
                                <label htmlFor="entite">Organisation</label>
                                <input style={{ accentColor: selectedCard.color }} type="radio" name="entite" id="" />
                            </div>
                        </div>
                        <textarea name="" id="" style={{ borderColor: selectedCard.color, color: selectedCard.color }} placeholder='Avez-vous quelque chose à rajouter (facultatif)'></textarea>
                    </form> */}
                    <button className="Btn ctaBtn" onClick={(e) => { handleOnAddToCart(e) }} style={{ background: selectedCard.color, color: `${selectedCard.name.toLowerCase() === "black" && "#fff"}` }}>Ajouter à mon panier</button>
                </div>
            }
            <div className="right">
                <div className="card" style={{ background: selectedCard.color }}></div>
            </div>
            <ToastContainer
                position='top-left'
                theme='dark'
            />
        </section>
    )
}

export default transition(Commande)