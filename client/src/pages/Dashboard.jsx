import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { getUserById, getUserInfoById, getUserOrders } from '../routes/api'
import { toast, ToastContainer } from 'react-toastify'

function Dashboard() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [userInfos, setUserInfos] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [orders, setOrders] = useState(null)

    const fetchData = async () => {

        try {
            const response = await getUserById()

            if (response.data.status) {
                setUsername(response.data.username)
                const infos = await getUserInfoById()

                if (infos.data.status === "notFound") {
                    console.log(infos.data.message)
                }
                else {
                    setUserInfos(infos.data.userPerso)
                }

                const orders = await getUserOrders()

                if (orders.data.orders.length > 0) {
                    setOrders(orders.data.orders)
                }
            }
            setIsFetching(false)
        } catch (error) {

            setIsFetching(false)
            navigate("/login")
        }
    }
    useEffect(() => {
        setIsFetching(true)
        fetchData()
    }, []);

    const logOut = () => {
        let logOut = window.confirm("Se deconnecter ?");
        if (logOut) {
            sessionStorage.removeItem('token')
            navigate("/login")
        }
    }
    return (
        <>
            <Navbar></Navbar>
            {isFetching ? "Please wait..." : <>
                <section className="dashboard">
                    <div className="wrapper">
                        <h1>Bienvenue {username}</h1>

                        <div className="informations">
                            <h2>Informations personnelles :</h2>
                            {userInfos ? <ul>
                                <li>Nom : </li>
                                <li>Prénom : </li>
                                <li>Fonction : </li>
                                <li>Numéro de téléphone :</li>
                                <li>Email : </li>
                                <li>Bio : </li>
                                <li>Image de profil : <img src={""} alt="Profile" /></li>
                                <li>Fichier CV : <a href={""} target="_blank" rel="noopener noreferrer">Voir CV</a></li>
                            </ul> : <>
                                <div>
                                    <p>Vous n'avez pas encore enregistré les informations de votre profil</p>
                                </div>
                            </>}
                        </div>
                        <hr />
                        <div className="myorders">
                            <h2>Mes commandes</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Numéro de commande</th>
                                        <th>Carte</th>
                                        <th>Date de commande</th>
                                        <th>Quantité</th>
                                        <th>Prix total</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders != null ? orders.map((order) => {
                                        return <tr key="{order.id}">
                                            <td>{order.orderId}</td>
                                            <td>{order.cardName}</td>
                                            <td>{order.createdAt}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    }) : <tr><td colSpan={6}>Aucune commande pour l'instant</td></tr>}


                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className='Btn' onClick={() => { logOut() }}>Se deconnecter</button>
                </section>
            </>}
            <ToastContainer
                position='top-center'
                theme='dark'
            />

        </>
    )
}

export default Dashboard