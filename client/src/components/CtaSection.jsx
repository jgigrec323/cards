import React from 'react'
import { Link } from 'react-router-dom'

function CtaSection() {
    return (
        <section className="ctaSection" >
            <h2>Devenez le héros des affaires !</h2>
            <button className="Btn"><Link to={"/produits"}>Commandez maintenant</Link></button>
        </section>
    )
}

export default CtaSection