import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

function EditComponent({ setEditMode, editMode }) {
    const { savedData, setSavedData } = useAppContext();

    const navigate = useNavigate();
    const [headerOption, setHeaderOption] = useState(null);
    const [bodyOption, setBodyOption] = useState(null);
    const [footerOption, setFooterOption] = useState(null);
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



    const handleOnClick = () => {
        navigate("/personnalisation");
    };

    const handleUpdateProfile = () => {
        console.log(savedData)
    };

    const handleColorChange = (type, color) => {
        setColors(prevColors => ({
            ...prevColors,
            [type]: {
                type: 'uniqueColor',
                value: color
            }
        }));
        updateSavedData(type, { type: 'uniqueColor', value: color });
    };

    const handleGradientChange = (type, color1, color2) => {
        setColors(prevColors => ({
            ...prevColors,
            [type]: {
                type: 'gradient',
                value: [color1, color2]
            }
        }));
        updateSavedData(type, { type: 'gradient', value: [color1, color2] });
    };

    const handleImageChange = (type, url) => {
        setColors(prevColors => ({
            ...prevColors,
            [type]: {
                type: 'image',
                value: url
            }
        }));
        updateSavedData(type, { type: 'image', value: url });
    };

    const handleTextColorChange = (textType, color) => {
        setColors(prevColors => ({
            ...prevColors,
            texts: {
                ...prevColors.texts,
                [textType]: color
            }
        }));

        // Update savedData with text color changes
        setSavedData(prevData => ({
            ...prevData,
            texts: {
                ...prevData.texts,
                [textType]: color
            }
        }));
    };
    const handleButtonColorChange = (colorType, color) => {
        setColors(prevColors => ({
            ...prevColors,
            button: {
                ...prevColors.button,
                [colorType]: color
            }
        }));

        // Update savedData with button color changes
        updateSavedData('button', {
            ...colors.button,
            [colorType]: color
        });
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
            <span className="mdi mdi-close" onClick={() => setEditMode(false)}></span>
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
                            <p>Gradient Color 1: <input type="color" onChange={(e) => handleGradientChange('header', e.target.value, colors.header?.value[1])} /></p>
                            <p>Gradient Color 2: <input type="color" onChange={(e) => handleGradientChange('header', colors.header?.value[0], e.target.value)} /></p>
                        </>
                    )}
                    {headerOption === 'image' && (
                        <p>Background Image URL: <input type="text" onChange={(e) => handleImageChange('header', e.target.value)} /></p>
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
                            <p>Gradient Color 1: <input type="color" onChange={(e) => handleGradientChange('footer', e.target.value, colors.footer?.value[1])} /></p>
                            <p>Gradient Color 2: <input type="color" onChange={(e) => handleGradientChange('footer', colors.footer?.value[0], e.target.value)} /></p>
                        </>
                    )}
                    {footerOption === 'image' && (
                        <p>Background Image URL: <input type="text" onChange={(e) => handleImageChange('footer', e.target.value)} /></p>
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
