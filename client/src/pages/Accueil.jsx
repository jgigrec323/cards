import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import Card from '../components/Card';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import transition from '../js/transition';
import { useGSAP } from '@gsap/react';
import Commande from '../components/Commande';
import { useAppContext } from '../components/AppContext';
import { moving } from '../js/mouse'

function Accueil() {
    const { cards, isCommandClicked, setIsCommandClicked } = useAppContext();
    useEffect(() => {
        moving()

        if (isCommandClicked) {
            window.document.body.style.overflowY = "hidden"
        }
        else {
            window.document.body.style.overflowY = "scroll"
        }
    }, [isCommandClicked])
    return (
        <div className=''>
            <div className="mouse">
                <div className="clickToCommand">Cliquez pour commander</div>
            </div>
            <Navbar></Navbar>
            <Hero></Hero>

            <InfoSection orientation={"left"} bgColor={"#7575750f"} color={"#000"}>
                Elles sont l'occasion de vous démarquer de la concurrence et de faire une impression durable sur vos clients, prospects, partenaires et collègues.
            </InfoSection>
            <InfoSection orientation={"right"} color={"#fff"} bgColor={"#000"}>
                Nos cartes sont élégantes, innovantes et durables. Elles attireront l'attention de votre audience, susciteront la curiosité et vous aideront à vous positionner comme un professionnel de confiance et de qualité.
            </InfoSection>
            <InfoSection orientation={"left"} color={"#000"} bgColor={"#E3CC00"}>
                Avec nos cartes, vous faites une déclaration d'intention. Vous montrez que vous êtes une personne ou une entreprise qui se soucie de l'excellence et qui est prête à investir dans son image.
            </InfoSection>
            <div className="aboutCards" style={{ marginTop: "100vh" }}>
                <h2 className="titre">Nos cartes</h2>
                <div className="cards" >
                    {isCommandClicked && <Commande></Commande>}
                    {cards.map((card, index) => (
                        <Card key={index} ind={index} cardName={card.cardName} bgColor={card.bgColor} cardColor={card.cardColor}></Card>
                    ))}
                </div>
            </div>

            <CtaSection></CtaSection>
            <Footer></Footer>
            <div className="copyright">© 2024 geniusgalant</div>
        </div>
    );
}

export default transition(Accueil);
