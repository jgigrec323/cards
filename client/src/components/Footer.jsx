import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div>
                <h3 className="footerTitre">Contact</h3>
                <ul className="bottom">
                    <li>lightcom@gmail.com</li>
                    <li>+5548548454</li>
                </ul>
            </div>
            <div>
                <h3 className="footerTitre">Comptes sociaux</h3>
                <ul className="bottom">
                    <li>@lightCom</li>
                    <li>lightCom</li>
                </ul>
            </div>
            <div>
                <h3 className="footerTitre">Menu</h3>
                <ul className="bottom">
                    <NavLink to={"/"}>Accueil</NavLink>
                    <NavLink to={"/produits"}>Produits</NavLink>
                    <NavLink to={"/a-propos"}>A propos</NavLink>
                    <NavLink to={"/contact"}>Contact</NavLink>
                </ul>
            </div>

        </footer>
    )
}

export default Footer