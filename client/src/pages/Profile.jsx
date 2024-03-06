import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import transition from '../js/transition';
import { useAppContext } from '../components/AppContext';
import EditComponent from '../components/EditComponent';
import { authenticateUserRoutes, getInfoByUsername, populateStyle, updateBody, updateButton, updateFooter, updateHeader, updateTexts } from '../routes/api';

function Profile() {
    const { username } = useParams()
    const { savedData, setSavedData, setIsCommandClicked, isCommandClicked } = useAppContext();
    const [editMode, setEditMode] = useState(false);
    const [userInfos, setUserInfos] = useState({})
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isUserFound, setIsUserFound] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [styleObject, setStyleObject] = useState({
        header: {
            backgroundColor: '#ffffff',
        },
        body: {
            backgroundColor: '#ffffff',
        },
        texts: {
            name: {
                color: '#000000',
            },
            fonction: {
                color: '#000000',
            },
            bio: {
                color: '#000000',
            },
        },
        footer: {
            backgroundColor: '#ffffff',
        },
        button: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
        },
    });



    const determineUser = async () => {
        setIsFetching(true)




        //has to be fetched by username
        const infos = await getInfoByUsername(username)
        console.log(infos)
        if (!infos.data.status) {
            setIsUserFound(false)
        }
        else {
            if (!localStorage.getItem("token")) {
                setIsUserLogged(false)
            }
            else {
                const response = await authenticateUserRoutes(username)
                setIsUserLogged(response.data.status)
            }

            if (infos.data.status === true) {
                setUserInfos(infos.data.userPerso)
                //const mergedData = { ...savedData, ...infos.data.userPerso };
                //setSavedData(mergedData);
                setStyleObject(prevStyleObject => ({
                    ...prevStyleObject,
                    header: {
                        backgroundColor: infos.data.Header ? infos.data.Header.value : '#ffffff',
                    },
                    body: {
                        backgroundColor: infos.data.Body ? infos.data.Body.value : '#ffffff',
                    },
                    texts: {
                        name: {
                            color: infos.data.Text ? infos.data.Text.nameColor : '#000000',
                        },
                        fonction: {
                            color: infos.data.Text ? infos.data.Text.fonctionColor : '#000000',
                        },
                        bio: {
                            color: infos.data.Text ? infos.data.Text.bioColor : '#000000',
                        },
                    },
                    footer: {
                        backgroundColor: infos.data.Footer ? infos.data.Footer.value : '#ffffff',
                    },
                    button: {
                        backgroundColor: infos.data.Button ? infos.data.Button.bgColor : '#ffffff',
                        textColor: infos.data.Button ? infos.data.Button.textColor : '#000000',
                    },
                }));
            }
            setIsUserFound(true)

            //await populateStyleObjects()

        }


        setIsFetching(false)
    }
    function isImageFile(value) {
        // List of supported image file extensions
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        // Extracting file extension
        const extension = value.split('.').pop().toLowerCase();

        // Checking if the extension is in the list of image extensions
        return imageExtensions.includes(extension);
    }

    const populateStyleObjects = async () => {
        const { button_id, texts_id, header_id, footer_id, body_id } = userInfos;
        try {
            const response = await populateStyle({ buttonId: button_id, bodyId: body_id, textsId: texts_id, headerId: header_id, footerId: footer_id });
            console.log(response)
            if (response.data.status) {
                const { button, header, body, footer, texts } = response.data;
                const fbg = isImageFile(footer.value) ? `url(${process.env.REACT_APP_BASE_URL}/uploads/${footer.value})` : footer.value
                const hbg = isImageFile(header.value) ? `url(${process.env.REACT_APP_BASE_URL}/uploads/${header.value})` : header.value
                setStyleObject(prevStyleObject => ({
                    ...prevStyleObject,
                    body: { ...prevStyleObject.body, backgroundColor: body.value },
                    button: { ...prevStyleObject.button, backgroundColor: button.bgColor, textColor: button.textColor },
                    header: { ...prevStyleObject.header, backgroundColor: hbg },
                    footer: { ...prevStyleObject.footer, backgroundColor: fbg },
                    texts: {
                        ...prevStyleObject.texts,
                        bio: { ...prevStyleObject.texts.bio, color: texts.bioColor },
                        fonction: { ...prevStyleObject.texts.fonction, color: texts.fonctionColor },
                        name: { ...prevStyleObject.texts.name, color: texts.nameColor }
                    }
                }));
            }
        } catch (error) {
            console.error("Error populating style objects:", error);
        }
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

    useEffect(() => {
        if (userInfos && isUserFound) {
            populateStyleObjects();
        }
    }, [userInfos, isUserFound]);

    const renderHeader = () => {
        const headerStyle = styleObject.header;
        if (headerStyle.type === 'gradient' && headerStyle.value.length === 2) {
            return <header style={{ background: `linear-gradient(to right, ${headerStyle.value[0]}, ${headerStyle.value[1]})` }}></header>;
        } else {
            return <header style={{ background: headerStyle.backgroundColor }}></header>;
        }
    };

    // Function to render footer based on styleObject
    const renderFooter = () => {
        const footerStyle = styleObject.footer;
        if (footerStyle.type === 'gradient' && footerStyle.value.length === 2) {
            return <div className="profileFooter" style={{ background: `linear-gradient(to right, ${footerStyle.value[0]}, ${footerStyle.value[1]})` }}></div>;
        } else {
            return <div className="profileFooter" style={{ background: footerStyle.backgroundColor }}></div>;
        }
    };


    // Function to render body based on styleObject
    const renderBody = () => {
        return (
            <div className="infos" style={{ background: styleObject.body.backgroundColor }}>
                <div className="profilePic">
                    <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${userInfos.profileImage}`} alt="Profile" />
                </div>
                <div className="infosPerso">
                    <h1 className='name' style={{ color: styleObject.texts.name.color }}>{userInfos.prenom} {userInfos.nom}</h1>
                    <p className="fonction" style={{ color: styleObject.texts.fonction.color }}>{userInfos.fonction}</p>
                </div>
                <p className="bio" style={{ color: styleObject.texts.bio.color }}>{userInfos.bio}</p>
                <ul className="liensSociaux" style={{ color: styleObject.button.backgroundColor }}>
                    {userInfos.SocialMedium.facebook && (
                        <Link target='_blank' to={`https://www.facebook.com/${userInfos.SocialMedium.facebook}`}><span className="mdi mdi-facebook"></span></Link>
                    )}
                    {userInfos.SocialMedium.instagram && (
                        <Link target='_blank' to={`https://www.instagram.com/${userInfos.SocialMedium.instagram}`}><span className="mdi mdi-instagram"></span></Link>
                    )}
                    {userInfos.SocialMedium.twitter && (
                        <Link target='_blank' to={`https://www.twitter.com/${userInfos.SocialMedium.twitter}`}><span className='mdi mdi-twitter'></span></Link>
                    )}
                    {userInfos.SocialMedium.whatsapp && (
                        <Link target='_blank' to={`https://wa.me/${userInfos.SocialMedium.whatsapp}`}><span className="mdi mdi-whatsapp"></span></Link>
                    )}
                </ul>
                <ul className="contacts">
                    <li><span className="mdi mdi-email" style={{ color: styleObject.texts.bio.color }}></span> <a href={`mailto:${userInfos.email}`} style={{ color: styleObject.texts.bio.color }}>{userInfos.email}</a></li>
                    <li><span className="mdi mdi-phone" style={{ color: styleObject.texts.bio.color }}></span> <a href={`tel:${userInfos.phoneNumber}`} style={{ color: styleObject.texts.bio.color }}>{userInfos.phoneNumber}</a></li>
                </ul>
                <div className="actionBnts">
                    <a href={`${process.env.REACT_APP_BASE_URL}/uploads/${userInfos.cvFile}`} download={`CV de ${userInfos.prenom} ${userInfos.nom}`}><button className="Btn" style={{ background: styleObject.button.backgroundColor, color: styleObject.button.textColor }}>Télécharger mon cv</button></a>
                    <button className="Btn" style={{ background: styleObject.button.backgroundColor, color: styleObject.button.textColor }}>Enregistrer mon contact</button>
                </div>
            </div>
        );
    };


    const renderEditButton = () => {
        if (!isUserLogged) {
            return null;
        }
        const buttonStyle = { background: styleObject.button.backgroundColor, color: styleObject.button.textColor }
        return (
            <span style={buttonStyle} onClick={() => { setEditMode(!editMode); updateStyle() }} className='mdi mdi-pencil'></span>
        );
    };

    const updateStyle = async () => {
        const { button_id, texts_id, header_id, footer_id, body_id } = userInfos;

        try {
            if (styleObject.header.backgroundColor.length < 255) {
                const updatedHeader = await updateHeader({ id: header_id, value: styleObject.header.backgroundColor })
            }
            if (styleObject.footer.backgroundColor.length < 255) {
                const updatedFooter = await updateFooter({ id: footer_id, value: styleObject.footer.backgroundColor })
            }
            const updatedButton = await updateButton({ id: button_id, bgColor: styleObject.button.backgroundColor, textColor: styleObject.button.textColor })
            const updatedTexts = await updateTexts({ id: texts_id, bioColor: styleObject.texts.bio.color, fonctionColor: styleObject.texts.fonction.color, nameColor: styleObject.texts.name.color })
            const updatedBody = await updateBody({ id: body_id, value: styleObject.body.backgroundColor })

            console.log(updatedButton, updatedTexts, updatedBody)
        } catch (error) {
            throw error
        }

    }

    return (
        <main className='profilePage'>
            <EditComponent userInfos={userInfos} styleObject={styleObject} setStyleObject={setStyleObject} setEditMode={setEditMode} editMode={editMode} updateStyle={updateStyle}></EditComponent>
            {!isFetching && isUserFound && (
                <>
                    {renderHeader()}
                    {renderBody()}
                    {renderFooter()}
                    {renderEditButton()}
                </>
            )}
            {!isFetching && !isUserFound && <div>User not found</div>}
            {isFetching && <div>Loading...</div>}

            {renderEditButton()}
        </main>
    );
}

export default transition(Profile);
