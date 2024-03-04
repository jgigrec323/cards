import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import transition from '../js/transition';
import { useAppContext } from '../components/AppContext';
import EditComponent from '../components/EditComponent';
import { authenticateUserRoutes, getUserInfoById } from '../routes/api';

function Profile() {
    const { username } = useParams()
    const { savedData, setSavedData, setIsCommandClicked, isCommandClicked } = useAppContext();
    const [editMode, setEditMode] = useState(false);
    const [userInfos, setUserInfos] = useState({})
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isUserFound, setIsUserFound] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    const navigate = useNavigate();

    const determineUser = async () => {
        setIsFetching(true)
        console.log(username)
        if (!localStorage.getItem("token")) {
            setIsUserLogged(false)
        }
        else {
            //has to be fetched by username
            const infos = await getUserInfoById()

            if (!infos.data.status) {
                setIsUserFound(false)
            }
            else {
                const response = await authenticateUserRoutes(username)
                setIsUserLogged(response.data.status)
                if (infos.data.status === true) {
                    setUserInfos(infos.data.userPerso)
                    const mergedData = { ...savedData, ...infos.data.userPerso };
                    setSavedData(mergedData);
                }
                setIsUserFound(true)
            }

        }
        setIsFetching(false)
    }

    useEffect(() => {
        setIsCommandClicked(false);

        if (isCommandClicked) {
            window.document.body.style.overflowY = "hidden";
        } else {
            window.document.body.style.overflowY = "scroll";
        }

        // Check if savedData is null or not set, then redirect to the appropriate page
        determineUser()
    }, [isCommandClicked]);

    // Function to render header based on savedData
    const renderHeader = () => {
        if (!savedData || !savedData.header || !savedData.header.type) {
            return <header></header>;
        }

        // Switch based on the type of header
        switch (savedData.header.type) {
            case 'uniqueColor':
                return <header style={{ background: savedData.header.value }}></header>;
            case 'gradient':
                const [color1, color2] = savedData.header.value || ['#ffffff', '#ffffff']; // Default gradient colors
                return <header style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}></header>;
            case 'image':
                return <header style={{ backgroundImage: `url(${savedData.header.value})` }}></header>;
            default:
                return <header></header>;
        }
    };

    // Function to render footer based on savedData
    const renderFooter = () => {
        if (!savedData || !savedData.footer || !savedData.footer.type) {
            return <div className="profileFooter"></div>;
        }

        // Switch based on the type of footer
        switch (savedData.footer?.type) {
            case 'uniqueColor':
                return <div className="profileFooter" style={{ background: savedData.footer.value }}></div>;
            case 'gradient':
                const [color1, color2] = savedData.footer.value || ['#ffffff', '#ffffff']; // Default gradient colors
                return <div className="profileFooter" style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}></div>;
            case 'image':
                return <div className="profileFooter" style={{ backgroundImage: `url(${savedData.footer.value})` }}></div>;
            default:
                return <div className="profileFooter"></div>;
        }
    };
    const renderBody = () => {
        if (!savedData || !savedData.body) {
            return <div className="profileBody"></div>;
        }

        return (
            <div className="infos" style={{ background: savedData.body?.value || '#fff' }}>
                <div className="profilePic">
                    <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${userInfos.profileImage}`} alt="Profile" />
                </div>
                <div className="infosPerso">
                    <h1 className='name' style={{ color: savedData.texts?.name }}>{savedData.prenom} {savedData.nom}</h1>
                    <p className="fonction" style={{ color: savedData.texts?.fonction }}>{savedData.fonction}</p>
                </div>
                <p className="bio" style={{ color: savedData.texts?.bio }}>{savedData.bio}</p>
                <ul className="liensSociaux" style={{ color: savedData.button?.bgColor }}>
                    {savedData.socialMedia.facebook && savedData.socialMedia.facebook.active && savedData.socialMedia.facebook.username && (
                        <Link target='_blank' to={`https://www.facebook.com/${savedData.socialMedia.facebook.username}`}><span className="mdi mdi-facebook"></span></Link>
                    )}
                    {savedData.socialMedia.instagram && savedData.socialMedia.instagram.active && savedData.socialMedia.instagram.username && (
                        <Link target='_blank' to={`https://www.instagram.com/${savedData.socialMedia.instagram.username}`}><span className="mdi mdi-instagram"></span></Link>
                    )}
                    {savedData.socialMedia.twitter && savedData.socialMedia.twitter.active && savedData.socialMedia.twitter.username && (
                        <Link target='_blank' to={`https://www.twitter.com/${savedData.socialMedia.twitter.username}`}><span className='mdi mdi-twitter'></span></Link>
                    )}
                    {savedData.socialMedia.whatsapp && savedData.socialMedia.whatsapp.active && savedData.socialMedia.whatsapp.username && (
                        <Link target='_blank' to={`https://wa.me/${savedData.socialMedia.whatsapp.username}`}><span className="mdi mdi-whatsapp"></span></Link>
                    )}
                </ul>
                <ul className="contacts">
                    <li><span className="mdi mdi-email" style={{ color: savedData.texts?.bio }}></span> <a href={`mailto:${savedData.email}`} style={{ color: savedData.texts?.bio }}>{savedData.email}</a></li>
                    <li><span className="mdi mdi-phone" style={{ color: savedData.texts?.bio }}></span> <a href={`tel:${savedData.phoneNumber}`} style={{ color: savedData.texts?.bio }}>{savedData.phoneNumber}</a></li>
                </ul>
                <div className="actionBnts">
                    <a href={savedData.cvFile} download><button className="Btn" style={{ background: savedData.button?.bgColor, color: savedData.button?.textColor }}>Télécharger mon cv</button></a>
                    <button className="Btn" style={{ background: savedData.button?.bgColor, color: savedData.button?.textColor }}>Enregistrer mon contact</button>
                </div>
            </div>
        );
    };

    const renderEditButton = () => {
        if (!isUserLogged) {
            return null; // Render nothing if user is not logged in or if savedData is not found
        }

        const buttonStyle = savedData && (savedData.button ? { background: savedData.button.bgColor, color: savedData.button.textColor } : "")

        return (
            <span style={buttonStyle} onClick={() => { setEditMode(!editMode) }} className='mdi mdi-pencil'></span>
        );
    };

    return (
        <main className='profilePage'>
            <EditComponent setEditMode={setEditMode} editMode={editMode}></EditComponent>
            {!isFetching ? <>
                {renderHeader()}
                {renderBody()}
                {renderFooter()}
            </> : "loading"}

            {renderEditButton()}
        </main>
    );
}

export default transition(Profile);
