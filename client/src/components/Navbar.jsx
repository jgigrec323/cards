import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CartIcon from './CartIcon';
import { useAppContext } from './AppContext';

function Navbar() {
    const ref = useRef([])
    const [token, setToken] = useState(null)
    const pushRef = (el) => ref.current.push(el);
    const { user } = useAppContext();

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
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token)
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
                {token ? (
                    <>

                        <button className="Btn ctaBtn">
                            <Link to={`/${user}`}>Mon profile</Link>
                        </button></>
                ) : (
                    <button className="Btn ctaBtn" ref={(el) => pushRef(el)}> <Link to={"/login"}>Se connecter</Link> </button>
                )}

            </div>
        </nav>
    )
}

export default Navbar