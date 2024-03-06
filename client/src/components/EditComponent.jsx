import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { updateFooter, updateHeader, uploadImage } from '../routes/api';

function EditComponent({ userInfos, setEditMode, editMode, styleObject, setStyleObject, updateStyle }) {
    const { savedData, setSavedData } = useAppContext();

    const navigate = useNavigate();
    const [headerOption, setHeaderOption] = useState(null);
    const [bodyOption, setBodyOption] = useState(null);
    const [footerOption, setFooterOption] = useState(null);
    const [headerImage, setHeaderImage] = useState(null);
    const [footerImage, setFooterImage] = useState(null);
    const [colors, setColors] = useState({
        header: null,
        body: null,
        footer: null,
        texts: {
            name: null,
            bio: null,
            fonction: null,
        },
        button: {
            textColor: null,
            bgColor: null
        }
    });
    const [headerAngle, setHeaderAngle] = useState(0);
    const [footerAngle, setFooterAngle] = useState(0);
    const headerImageInputRef = useRef(null);
    const footerImageInputRef = useRef(null);

    const handleOnClick = () => {
        navigate("/personnalisation");
    };

    const handleUpdateProfile = () => {
        console.log(savedData)
    };

    const handleColorChange = (type, color) => {
        const updatedStyleObject = { ...styleObject };
        updatedStyleObject[type] = { backgroundColor: color };
        setStyleObject(updatedStyleObject);
        updateSavedData(type, { type: 'uniqueColor', value: color });
    };

    const handleGradientChange = (type, color1, color2, angle, sectionType) => {
        // Construct the linear gradient string
        const linearGradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;


        // Update the colors state to store the gradient information
        setColors(prevColors => ({
            ...prevColors,
            [type]: {
                type: 'gradient',
                value: [color1, color2]
            }
        }));

        // Ensure both colors are defined before updating saved data
        if (color1 && color2) {
            // Update the saved data with the gradient colors
            updateSavedData(type, { type: 'gradient', value: [color1, color2] });

            // Update the styleObject with the linear gradient background
            const updatedStyleObject = { ...styleObject };
            updatedStyleObject[type] = { backgroundColor: linearGradient };
            setStyleObject(updatedStyleObject);
        }
    };

    const handleAngleChange = (angle, sectionType) => {
        // Update the angle state based on section type
        if (sectionType === 'header') {
            setHeaderAngle(angle);
            // Call handleGradientChange with the updated angle
            handleGradientChange('header', colors.header?.value[0], colors.header?.value[1], headerAngle, 'header');
        } else if (sectionType === 'footer') {
            setFooterAngle(angle);
            // Call handleGradientChange with the updated angle
            handleGradientChange('footer', colors.footer?.value[0], colors.footer?.value[1], footerAngle, 'footer');
        }
    };
    const handleImageUpload = async (type, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                if (type === 'header') {
                    setHeaderImage(imageUrl);
                    handleImageChange('header', imageUrl);
                } else if (type === 'footer') {
                    setFooterImage(imageUrl);
                    handleImageChange('footer', imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
        await uploadFile(type, e);
    };
    const uploadFile = async (type, e) => {
        const file = e.target.files[0];
        if (file) {
            const formulaire = new FormData()
            formulaire.append('newFileName', file)
            const response = await uploadImage(formulaire)

            if (type === 'header') {
                const updatedHeader = await updateHeader({ id: userInfos.header_id, value: response.data.filename })
            }
            if (type === 'footer') {
                const updatedFooter = await updateFooter({ id: userInfos.footer_id, value: response.data.filename })
            }
        }
    }

    const handleImageChange = (type, url) => {
        const updatedStyleObject = { ...styleObject };
        updatedStyleObject[type] = { backgroundColor: `url(${url})` };
        setStyleObject(updatedStyleObject);
        updateSavedData(type, { type: 'image', value: url });
    };

    const handleTextColorChange = (textType, color) => {
        const updatedColors = { ...colors };
        updatedColors.texts[textType] = color;
        setColors(updatedColors);

        const updatedStyleObject = { ...styleObject };
        updatedStyleObject.texts[textType] = { color };
        setStyleObject(updatedStyleObject);

        // Update savedData with text color changes
        updateSavedData('texts', updatedColors.texts);
    };

    const handleButtonColorChange = (colorType, color) => {
        const updatedColors = { ...colors };
        updatedColors.button[colorType] = color;
        setColors(updatedColors);

        const updatedStyleObject = { ...styleObject };
        if (colorType === 'textColor') {
            updatedStyleObject.button.textColor = color;
        } else if (colorType === 'bgColor') {
            updatedStyleObject.button.backgroundColor = color;
        }
        setStyleObject(updatedStyleObject);

        // Update savedData with button color changes
        updateSavedData('button', updatedColors.button);
    };



    const updateSavedData = (type, value) => {
        setSavedData(prevData => ({
            ...prevData,
            [type]: value
        }));
    };
    return (
        <aside className={`editComponent ${editMode ? 'visible' : ''}`}>
            <h2>Edit panel</h2>
            <span className="mdi mdi-close" onClick={() => { setEditMode(false); updateStyle() }}></span>
            <button className='infosEditBtn' onClick={handleOnClick}>Changer mes informations</button>

            <div className="options">


                <div className='option'>
                    <p className='optionName'>Header</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={headerOption === 'uniqueColor'}
                            onChange={() => setHeaderOption('uniqueColor')}
                        />
                        <label>Unique Color</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={headerOption === 'gradient'}
                            onChange={() => setHeaderOption('gradient')}
                        />
                        <label>Gradient</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={headerOption === 'image'}
                            onChange={() => setHeaderOption('image')}
                        />
                        <label>Background Image</label>
                    </div>
                    {headerOption === 'uniqueColor' && (
                        <p>Unique Color: <input type="color" onChange={(e) => handleColorChange('header', e.target.value)} /></p>
                    )}
                    {headerOption === 'gradient' && (
                        <>
                            <p>Gradient Color 1: <input type="color" onChange={(e) => handleGradientChange('header', e.target.value, colors.header?.value[1], headerAngle, 'header')} /></p>
                            <p>Gradient Color 2: <input type="color" onChange={(e) => handleGradientChange('header', colors.header?.value[0], e.target.value, headerAngle, 'header')} /></p>
                            <p>Gradient Angle: <input type="number" min="0" max="360" value={headerAngle} onChange={(e) => { setHeaderAngle(e.target.value); handleAngleChange(e.target.value, 'header') }} /> degrees</p>
                        </>
                    )}
                    {headerOption === 'image' && (
                        <input type="file" accept='image/*' onChange={(e) => handleImageUpload('header', e)} ref={headerImageInputRef} name="headerBg" />
                    )}
                </div>
                <div className='option'>
                    <p className='optionName'>Body</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={bodyOption === 'uniqueColor'}
                            onChange={() => setBodyOption('uniqueColor')}
                        />
                        <label>Unique Color</label>
                    </div>


                    {bodyOption === 'uniqueColor' && (
                        <p>Unique Color: <input type="color" onChange={(e) => handleColorChange('body', e.target.value)} /></p>
                    )}

                </div>
                <div className='option'>
                    <p className='optionName'>Footer</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={footerOption === 'uniqueColor'}
                            onChange={() => setFooterOption('uniqueColor')}
                        />
                        <label>Unique Color</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={footerOption === 'gradient'}
                            onChange={() => setFooterOption('gradient')}
                        />
                        <label>Gradient</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            checked={footerOption === 'image'}
                            onChange={() => setFooterOption('image')}
                        />
                        <label>Background Image</label>
                    </div>
                    {footerOption === 'uniqueColor' && (
                        <p>Unique Color: <input type="color" onChange={(e) => handleColorChange('footer', e.target.value)} /></p>
                    )}
                    {footerOption === 'gradient' && (
                        <>
                            <p>Gradient Color 1: <input type="color" onChange={(e) => handleGradientChange('footer', e.target.value, colors.footer?.value[1], footerAngle, 'footer')} /></p>
                            <p>Gradient Color 2: <input type="color" onChange={(e) => handleGradientChange('footer', colors.footer?.value[0], e.target.value, footerAngle, 'footer')} /></p>
                            <p>Gradient Angle: <input type="number" min="0" max="360" value={footerAngle} onChange={(e) => { setFooterAngle(e.target.value); handleAngleChange(e.target.value, 'footer'); }} /> degrees</p>
                        </>
                    )}
                    {footerOption === 'image' && (
                        //<p>Background Image URL: <input type="text" onChange={(e) => handleImageChange('footer', e.target.value)} /></p>
                        <input type="file" accept='image/*' onChange={(e) => handleImageUpload('footer', e)} ref={footerImageInputRef} name="footerBg" />
                    )}
                </div>
                <div className='option'>
                    <p className='optionName'>Name color</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={colors.texts.name !== null}
                            onChange={() => handleTextColorChange('name', colors.texts.name !== null ? null : '#000')}
                        />
                        <label>Unique Color</label>
                        {colors.texts.name !== null && (
                            <input
                                type="color"
                                value={colors.texts.name}
                                onChange={(e) => handleTextColorChange('name', e.target.value)}
                            />
                        )}
                    </div>
                </div>
                <div className='option'>
                    <p className='optionName'>Fonction color</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={colors.texts.fonction !== null}
                            onChange={() => handleTextColorChange('fonction', colors.texts.fonction !== null ? null : '#000')}
                        />
                        <label>Unique Color</label>
                        {colors.texts.fonction !== null && (
                            <input
                                type="color"
                                value={colors.texts.fonction}
                                onChange={(e) => handleTextColorChange('fonction', e.target.value)}
                            />
                        )}
                    </div>
                </div>
                <div className='option'>
                    <p className='optionName'>Bio color</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={colors.texts.bio !== null}
                            onChange={() => handleTextColorChange('bio', colors.texts.bio !== null ? null : '#000')}
                        />
                        <label>Unique Color</label>
                        {colors.texts.bio !== null && (
                            <input
                                type="color"
                                value={colors.texts.bio}
                                onChange={(e) => handleTextColorChange('bio', e.target.value)}
                            />
                        )}
                    </div>
                </div>
                <div className='option'>
                    <p className='optionName'>Button Text Color</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={colors.button.textColor !== null}
                            onChange={() => handleButtonColorChange('textColor', colors.button.textColor !== null ? null : '#000')}
                        />
                        <label>Unique Color</label>
                        {colors.button.textColor !== null && (
                            <input
                                type="color"
                                value={colors.button.textColor}
                                onChange={(e) => handleButtonColorChange('textColor', e.target.value)}
                            />
                        )}
                    </div>
                </div>
                <div className='option'>
                    <p className='optionName'>Button Background Color</p>
                    <div>
                        <input
                            type="checkbox"
                            checked={colors.button.bgColor !== null}
                            onChange={() => handleButtonColorChange('bgColor', colors.button.bgColor !== null ? null : '#000')}
                        />
                        <label>Unique Color</label>
                        {colors.button.bgColor !== null && (
                            <input
                                type="color"
                                value={colors.button.bgColor}
                                onChange={(e) => handleButtonColorChange('bgColor', e.target.value)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <button className='saveBtn' onClick={handleUpdateProfile}>Sauvegarder</button>
        </aside>
    );
}

export default EditComponent;
