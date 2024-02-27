import React from 'react'
import Navbar from '../components/Navbar'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'
import transition from '../js/transition'
import { useAppContext } from '../components/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Produits() {
    const { cards, addToCart } = useAppContext();

    const handleClick = (e, index) => {
        e.preventDefault()
        let bg = cards[index].bgColor;
        if (index === 2) { bg = "#fff" }
        if (index === 0) { bg = "#fff" }
        let card = { color: cards[index].cardColor, price: cards[index].price, name: cards[index].cardName, bg: bg }

        addToCart(card)
        toast.success("Carte ajoutée au panier !")

    }
    return (
        <div>
            <ToastContainer
                position='top-left'
                theme='dark'
            />
            <Navbar></Navbar>
            <h2 className="titre" style={{ marginTop: "1rem" }}>Nos cartes</h2>
            <div className="productCards">
                {cards.map((card, index) => (
                    <div className="productCard" key={index}>
                        <div className="top">
                            <div className="card" style={{ backgroundColor: card.cardColor }}></div>
                        </div>
                        <div className="bottom">
                            <h2>{card.cardName}</h2>
                            <div className="price">{card.price} GNF</div>
                            <button className="Btn" onClick={(e) => { handleClick(e, index) }}>Ajouter à la carte</button>
                        </div>
                    </div>
                ))}

            </div>
            <CtaSection></CtaSection>
            <Footer></Footer>
            <div className="copyright">© 2024 geniusgalant</div>
        </div>
    )
}

export default transition(Produits)