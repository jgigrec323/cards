import React, { useContext, useState } from 'react'
import transition from '../js/transition'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../routes/api'
import { useAppContext } from '../components/AppContext'
import { AuthContext } from '../components/AuthContext'
function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const { authenticate } = useContext(AuthContext);


    const { setUser } = useAppContext();


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            toast.error("Tous les champs doivent être saisis !")
            return;
        }
        else {

            if (username.length < 6) {
                toast.error("Le nom d'utilisateur ne doit pas être moins de 6 caractères")
                return;
            }
            if (password.length < 6) {
                toast.error("Le mot de passe ne doit pas être moins de 6 caractères")
                return;
            }
        }

        try {
            setIsFetching(true);
            const response = await loginUser({ username, password });

            if (response.data.status) {
                // Store the JWT token in sessionStorage

                sessionStorage.setItem('token', response.data.token);

                setUser(response.data.username)
                toast.success("Connexion réussie !");

                await authenticate()

                const redirectPath = location.state?.from || '/dashboard'; // Check for state
                navigate(redirectPath);

            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Erreur de connexion !");
        } finally {
            setIsFetching(false);
        }



    }

    return (
        <>
            <Navbar></Navbar>
            <section className="login">
                <div className="card card--1"></div>
                <div className="card card--2"></div>
                <div className="card card--3"></div>
                <div className="card card--4"></div>
                <div className="card card--5"></div>


                <div className="wrapper">
                    <div className="spacer"></div>
                    <div className="title">
                        <h1>Connectez-vous</h1>
                        <p>Le futur est numérique</p>
                    </div>
                    <form action="#" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="username">Entrez votre email ou nom d'utilisateur</label>
                            <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Entrez votre mot de passe</label>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='Btn' disabled={isFetching} onClick={(e) => handleSubmit(e)}>{isFetching ? "Patientez..." : "Se connecter"}</button>
                        <p>Pas de compte ? <Link to={"/register"}><b>S'inscrire</b></Link></p>
                    </form>
                </div>
            </section>
            <div className="spacer"></div>
            <ToastContainer
                position='top-center'
                theme='dark'
            />
            <Footer></Footer>
        </>
    )
}

export default transition(Login)