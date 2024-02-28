import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../routes/api';
function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !username || !password) {
            toast.error("Tous les champs doivent être saisis !")
            return;
        }
        else {
            if (!validateEmail(email)) {
                toast.error("Entrez une adresse email valide !")
                return;
            }

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
            const response = await registerUser({ email, username, password });
            if (response.data.status) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', response.data.token);
                toast.success("Inscription réussie !");

                navigate('/dashboard');
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Erreur d'inscription !");
        } finally {
            setIsFetching(false);
        }



    }

    return (
        <>
            <Navbar></Navbar>
            <section className="register">
                <div className="card card--1"></div>
                <div className="card card--2"></div>
                <div className="card card--3"></div>
                <div className="card card--4"></div>
                <div className="card card--5"></div>


                <div className="wrapper">
                    <div className="spacer"></div>
                    <div className="title">
                        <h1>Inscrivez-vous</h1>
                        <p>Le futur est numérique</p>
                    </div>
                    <form action="#" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="email">Entrez votre email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
                        </div>
                        <div>
                            <label htmlFor="username">Entrez votre nom d'utilisateur</label>
                            <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Entrez votre mot de passe</label>
                            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='Btn' disabled={isFetching} onClick={(e) => handleSubmit(e)}>{isFetching ? "Patientez..." : "S'inscrire"}</button>
                        <p>Vous avez déjà un compte ? <Link to={"/login"}><b>Se connecter</b></Link></p>
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

export default Register