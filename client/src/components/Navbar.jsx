import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartIcon from './CartIcon';

function Navbar() {
    const ref = useRef([])

    const pushRef = (el) => ref.current.push(el);

    useGSAP(() => {

        ref.current.forEach((el, index) => {
            gsap.from(el, {
                y: "-50px",
                opacity: 0.0,
                duration: 1,
                stagger: 0.1,
                ease: "power1.out",
                delay: 0.2 * index
            })
        });
    }, [])
    return (
        <nav>
            <div className="logo" ref={(el) => pushRef(el)}>ProCard</div>
            <ul className="navlinks" ref={(el) => pushRef(el)}>
                <NavLink to={"/"}>Accueil</NavLink>
                <NavLink to={"/produits"}>Produits</NavLink>
                <NavLink to={"/a-propos"}>A propos</NavLink>
                <NavLink to={"/contact"}>Contact</NavLink>
            </ul>
            <div className='actionsBtns'>
                <CartIcon ref={(el) => pushRef(el)}></CartIcon>
                <button className="Btn ctaBtn" ref={(el) => pushRef(el)}> <Link to={"/"}>Se connecter</Link> </button>
            </div>
        </nav>
    )
}

export default Navbar