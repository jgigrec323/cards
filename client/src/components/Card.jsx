import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from './AppContext';
import { useGSAP } from '@gsap/react';
import { Power2, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Card({ ind, bgColor, cardColor, cardName }) {
    gsap.registerPlugin(ScrollTrigger)
    const { cards, handleOnCommand } = useAppContext();
    const cardRef = useRef(null)

    const handleClick = (e, index) => {
        e.preventDefault();
        let bg = cards[index].bgColor;
        if (index === 2) { bg = "#fff" }
        if (index === 0) { bg = "#fff" }
        let card = { color: cards[index].cardColor, price: cards[index].price, name: cards[index].cardName, bg: bg }
        handleOnCommand(card)

    }

    useGSAP(() => {
        gsap.from(cardRef.current, {
            scale: .8,
            ease: Power2.out,
            duration: 1, // Adjust the rotation angle as needed
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top +100%',
                end: 'center', // Adjust the end position based on when you want the rotation to stop
                scrub: 0.5,
            },
        });
    }, {})
    return (
        <section className="card" style={{ backgroundColor: bgColor, color: cardColor }}>
            <div className="left">
                <h2 className='cardName'>{cardName}</h2>
                <NavLink to={"#"} onClick={(e) => { handleClick(e, ind) }}>Commander</NavLink>
            </div>
            <div className="right">
                <div className="card" ref={cardRef} style={{ backgroundColor: cardColor }}></div>
            </div>
        </section>
    )
}

export default Card
