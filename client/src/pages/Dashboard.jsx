import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { getUserById, getUserInfoById, getUserOrders, protectedRoutes } from '../routes/api'
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
                    console.log(userInfos)
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


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const checkAuth = async () => {
            try {
                const auth = await protectedRoutes();
                if (auth.data.status !== true) {
                    navigate('/login')
                }


            } catch (error) {
                throw error
            }
        };
        if (token) {
            checkAuth()
        }
        else {
            navigate('/login')
        }
    }, [navigate])

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
                                <li>Nom : {userInfos.nom} </li>
                                <li>Prénom : {userInfos.prenom} </li>
                                <li>Fonction : {userInfos.fonction} </li>
                                <li>Numéro de téléphone : {userInfos.phoneNumber}</li>
                                <li>Email : {userInfos.email} </li>
                                <li>Bio : {userInfos.bio} </li>
                                <li>Image de profil : <a href={`${process.env.REACT_APP_BASE_URL}/uploads/${userInfos.profileImage}`} target="_blank" rel="noopener noreferrer">Voir image</a></li>
                                <li>Fichier CV : <a href={`${process.env.REACT_APP_BASE_URL}/uploads/${userInfos.cvFile}`} target="_blank" rel="noopener noreferrer">Voir cv</a></li>
                            </ul> : <>
                                <div>
                                    <p>Vous n'avez pas encore enregistré les informations de votre profil</p>
                                    <Link to={'/personnalisation'}>Enregistrer mes informations</Link>
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