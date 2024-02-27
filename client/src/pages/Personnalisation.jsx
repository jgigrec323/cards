import React, { useState, useEffect } from 'react';
import { useAppContext } from '../components/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import transition from '../js/transition';

function Personnalisation() {
    const { saveUserDatas, savedData } = useAppContext();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        fonction: '',
        phoneNumber: '',
        email: '',
        bio: '',
        profileImage: null,
        cvFile: null,
        socialMedia: {
            facebook: { active: false, username: '' },
            instagram: { active: false, username: '' },
            twitter: { active: false, username: '' },
            whatsapp: { active: false, username: '' }
        }
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        console.log(name)
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                socialMedia: {
                    ...prevState.socialMedia,
                    [name]: { ...prevState.socialMedia[name], active: checked }
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
            socialMedia: {
                ...prevState.socialMedia,
                [name]: { ...prevState.socialMedia[name], username: value }
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


        saveUserDatas(formData)
        navigate('/profile')
    };

    useEffect(() => {
        if (savedData !== null) {

            setFormData(savedData)
        }
    }, [navigate, savedData])
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
                        </div>

                        <div className="socialMedia">
                            <div className="fb">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="facebook"
                                        checked={formData.socialMedia.facebook.active}
                                        onChange={handleInputChange}
                                    />
                                    Facebook
                                </label>
                                {formData.socialMedia.facebook.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Facebook"
                                        value={formData.socialMedia.facebook.username}
                                        onChange={(e) => handleUsernameChange(e, 'facebook')}
                                    />
                                )}
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="instagram"
                                        checked={formData.socialMedia.instagram.active}
                                        onChange={handleInputChange}
                                    />
                                    Instagram
                                </label>
                                {formData.socialMedia.instagram.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Instagram"
                                        value={formData.socialMedia.instagram.username}
                                        onChange={(e) => handleUsernameChange(e, 'instagram')}
                                    />
                                )}
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="twitter"
                                        checked={formData.socialMedia.twitter.active}
                                        onChange={handleInputChange}
                                    />
                                    Twitter
                                </label>
                                {formData.socialMedia.twitter.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre nom d'utilisateur Twitter"
                                        value={formData.socialMedia.twitter.username}
                                        onChange={(e) => handleUsernameChange(e, 'twitter')}
                                    />
                                )}
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="whatsapp"
                                        checked={formData.socialMedia.whatsapp.active}
                                        onChange={handleInputChange}
                                    />
                                    Whatsapp
                                </label>
                                {formData.socialMedia.whatsapp.active && (
                                    <input
                                        type="text"
                                        placeholder="Entrez votre numéro Whatsapp"
                                        value={formData.socialMedia.whatsapp.username}
                                        onChange={(e) => handleUsernameChange(e, 'whatsapp')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <button className="Btn" onClick={handleSave}>Voir mon profile</button>
            </div>
        </div>
    );
}

export default transition(Personnalisation);
