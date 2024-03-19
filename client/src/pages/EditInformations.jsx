import React, { useState, useEffect } from 'react';
import { useAppContext } from '../components/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import transition from '../js/transition';
import { editUserInfos, protectedRoutes, saveUserInfos } from '../routes/api';

function EditInformations() {
    const { saveUserDatas, savedData, userInformations, user } = useAppContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        nom: "",
        prenom: "",
        fonction: "",
        phoneNumber: "",
        email: "",
        bio: "",
        profileImage: null,
        cvFile: null,
        texts_id: null,
        footer_id: null,
        body_id: null,
        header_id: null,
        button_id: null,
        user_id: null,
        social_media_id: null,
        SocialMedium: {
            id: null,
            facebook: { active: false, username: '' },
            instagram: { active: false, username: '' },
            twitter: { active: false, username: '' },
            whatsapp: { active: false, username: '' },
            spotify: { active: false, username: '' },
            pinterest: { active: false, username: '' },
            youtube: { active: false, username: '' }
        },
        Button: {
            id: null,
            textColor: null,
            bgColor: null
        },
        Header: {
            id: null,
            value: null
        },
        Text: {
            id: null,
            bioColor: null,
            fonctionColor: null,
            nameColor: null
        },
        Body: {
            id: null,
            value: null
        },
        Footer: {
            id: null,
            value: null
        }
    });


    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        console.log(name);
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                SocialMedium: {
                    ...prevState.SocialMedium,
                    [name]: { ...prevState.SocialMedium[name], active: checked }
                }
            }));
        } else if (type === 'file') {
            const file = files[0];
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                alert('Choisissez un fichier moins de 2MB');
                return;
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Ajouter une image JPEG/PNG ou un fichier PDF');
                return;
            }

            if (name === 'profileImage') {
                setFormData(prevState => ({
                    ...prevState,
                    profileImage: file,
                }));
            } else if (name === 'cvFile') {
                console.log(file)
                setFormData(prevState => ({
                    ...prevState,
                    cvFile: file,
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleUsernameChange = (e, name) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            SocialMedium: {
                ...prevState.SocialMedium,
                [name]: { ...prevState.SocialMedium[name], username: value }
            }
        }));
    };

    const handleSave = () => {
        // Validation des champs
        if (formData.nom.trim() === '' || formData.prenom.trim() === '') {
            alert('Veuillez saisir votre nom et prénom.');
            return;
        }

        if (formData.phoneNumber.trim() === '') {
            alert('Veuillez saisir votre numéro de téléphone.');
            return;
        }

        if (formData.email.trim() === '') {
            alert('Veuillez saisir votre adresse e-mail.');
            return;
        }

        if (formData.bio.trim() === '') {
            alert('Veuillez saisir quelque chose pour votre bio.');
            return;
        }

        if (formData.bio.length > 80) {
            alert('La bio ne peut pas dépasser 80 caractères.');
            return;
        }

        if (!formData.profileImage) {
            alert('Veuillez choisir une image de profil.');
            return;
        }

        saveDatas();
        navigate(`/${user}`);
    };

    const saveDatas = async () => {
        const formDatas = new FormData();
        formDatas.append('nom', formData.nom);
        formDatas.append('prenom', formData.prenom);
        formDatas.append('fonction', formData.fonction);
        formDatas.append('phoneNumber', formData.phoneNumber);
        formDatas.append('email', formData.email);
        formDatas.append('bio', formData.bio);

        if (formData.profileImage) {
            formDatas.append('profileImage', formData.profileImage);
        }

        if (formData.cvFile) {
            formDatas.append('cvFile', formData.cvFile);
        }

        formDatas.append('socialMedia', JSON.stringify(formData.SocialMedium));

        saveUserDatas(formData);
        const response = editUserInfos(formDatas);
        console.log(response);
    };


    const initializeSocialMediaPlatform = (username) => ({
        active: username !== '',
        username: username
    });


    const populateForm = () => {
        setFormData(prevState => ({
            ...prevState,
            id: userInformations.id,
            nom: userInformations.nom,
            prenom: userInformations.prenom,
            fonction: userInformations.fonction,
            phoneNumber: userInformations.phoneNumber,
            email: userInformations.email,
            bio: userInformations.bio,
            profileImage: userInformations.profileImage,
            cvFile: userInformations.cvFile,
            texts_id: userInformations.texts_id,
            footer_id: userInformations.footer_id,
            body_id: userInformations.body_id,
            header_id: userInformations.header_id,
            button_id: userInformations.button_id,
            user_id: userInformations.user_id,
            social_media_id: userInformations.social_media_id,
            SocialMedium: {
                id: null,
                facebook: initializeSocialMediaPlatform(userInformations.SocialMedium.facebook),
                instagram: initializeSocialMediaPlatform(userInformations.SocialMedium.instagram),
                twitter: initializeSocialMediaPlatform(userInformations.SocialMedium.twitter),
                whatsapp: initializeSocialMediaPlatform(userInformations.SocialMedium.whatsapp),
                spotify: initializeSocialMediaPlatform(userInformations.SocialMedium.spotify),
                pinterest: initializeSocialMediaPlatform(userInformations.SocialMedium.pinterest),
                youtube: initializeSocialMediaPlatform(userInformations.SocialMedium.youtube)
            },
            Button: { ...userInformations.Button },
            Header: { ...userInformations.Header },
            Text: { ...userInformations.Text },
            Body: { ...userInformations.Body },
            Footer: { ...userInformations.Footer }
        }));
    }
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const checkAuth = async () => {
            try {
                const auth = await protectedRoutes();

                if (auth.data.status !== true) {
                    navigate('/login')
                }
                else {
                    if (savedData !== null) {
                        setFormData(savedData);
                    }
                    populateForm()
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



    return (
        <div className="personnalisation">
            <h1>Mes infos</h1>
            <div>
                <form>
                    <div className="part1">
                        <input
                            type="text"
                            name="nom"
                            placeholder="Nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Prénom(s)"
                            value={formData.prenom}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="fonction"
                            placeholder="Fonction (facultatif)"
                            value={formData.fonction}
                            onChange={handleInputChange}
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Numéro de téléphone"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="bio"
                            placeholder="Ecrivez quelque chose pour votre bio..."
                            value={formData.bio}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="part2">
                        <div className='fileDiv'>
                            <label htmlFor="profileImage">Ajoutez votre image de profil :</label>
                            <input
                                name='profileImage'
                                type="file"
                                id="profileImage"
                                accept='image/*'
                                onChange={handleInputChange}
                                required
                            />
                            {formData.profileImage && (
                                <button>
                                    <a href={`${process.env.REACT_APP_BASE_URL}/uploads/${formData.profileImage}`} target="_blank" rel="noopener noreferrer">Voir image</a>
                                </button>
                            )}
                        </div>
                        <div className='fileDiv'>
                            <label htmlFor="cvFile">Ajoutez votre CV :</label>
                            <input
                                name='cvFile'
                                type="file"
                                id="cvFile"
                                accept=".pdf"
                                onChange={handleInputChange}
                            />
                            {formData.cvFile && (
                                <button>
                                    <a href={`${process.env.REACT_APP_BASE_URL}/uploads/${formData.cvFile}`} target="_blank" rel="noopener noreferrer">Voir cv</a>
                                </button>
                            )}
                        </div>

                        <div className="socialMedia">
                            <div className="fb">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="facebook"
                                        checked={formData.SocialMedium.facebook.active}
                                        onChange={handleInputChange}
                                    />
                                    Facebook
                                </label>
                                {formData.SocialMedium.facebook.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Facebook"
                                        value={formData.SocialMedium.facebook.username}
                                        onChange={(e) => handleUsernameChange(e, 'facebook')}
                                    />
                                )}
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="instagram"
                                        checked={formData.SocialMedium.instagram.active}
                                        onChange={handleInputChange}
                                    />
                                    Instagram
                                </label>
                                {formData.SocialMedium.instagram.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Instagram"
                                        value={formData.SocialMedium.instagram.username}
                                        onChange={(e) => handleUsernameChange(e, 'instagram')}
                                    />
                                )}
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="twitter"
                                        checked={formData.SocialMedium.twitter.active}
                                        onChange={handleInputChange}
                                    />
                                    Twitter
                                </label>
                                {formData.SocialMedium.twitter.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Twitter"
                                        value={formData.SocialMedium.twitter.username}
                                        onChange={(e) => handleUsernameChange(e, 'twitter')}
                                    />
                                )}
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="whatsapp"
                                        checked={formData.SocialMedium.whatsapp.active}
                                        onChange={handleInputChange}
                                    />
                                    Whatsapp
                                </label>
                                {formData.SocialMedium.whatsapp.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre numéro Whatsapp"
                                        value={formData.SocialMedium.whatsapp.username}
                                        onChange={(e) => handleUsernameChange(e, 'whatsapp')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <button className="Btn" onClick={handleSave}>Enregistrer</button>
            </div>
        </div>
    );
}

export default transition(EditInformations);
