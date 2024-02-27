import React, { useState } from 'react';
import ColorPicker from 'react-color';

const MyColorPicker = () => {
    const [color, setColor] = useState('#fff');
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (updatedColor) => {
        setColor(updatedColor.hex);
    };

    const handleClose = () => {
        setShowPicker(false);
    };

    const handleClick = () => {
        setShowPicker(true);
    };

    return (
        <div>
            <button onClick={handleClick}>Pick Color</button>
            {showPicker && (
                <div>
                    <ColorPicker color={color} onChange={handleChange} />
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
            <div style={{ backgroundColor: color, width: 100, height: 100 }}>
                Selected Color
            </div>
        </div>
    );
};

export default MyColorPicker;
