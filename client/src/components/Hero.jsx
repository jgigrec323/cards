import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplitType from 'split-type';

function Hero() {
    const textRef = useRef(null);
    const navigate = useNavigate();
    useGSAP(() => {

        if (textRef.current) {
            const text = new SplitType(textRef.current, { types: 'words, chars' });
            gsap.from(text.chars, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: { amount: 0.5 },
            });
        }
        gsap.from(".secondaryText", {
            opacity: 0,
            y: 30,
            duration: 1,
        })
        gsap.from(".icon-scroll", {
            opacity: 0,
            delay: 1,
            duration: 1,
        })

    }, {});
    useEffect(() => {
        const handleClick = () => {
            navigate("/produits");
        };

        if (textRef.current) {
            textRef.current.addEventListener("click", handleClick);
        }

        return () => {
            if (textRef.current) {
                textRef.current.removeEventListener("click", handleClick);
            }
        };
    }, [navigate]);

    return (
        <section className="hero">
            <div className="mainText cursor-scale">
                <p ref={textRef}>Vos cartes de visite 100% numérique</p>
            </div>
            <p className="secondaryText">Optez pour des cartes professionnelles sans contact </p>
            <div className="icon-scroll"></div>
        </section>
    );
}

export default Hero;
