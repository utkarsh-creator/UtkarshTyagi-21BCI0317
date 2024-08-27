import React, { useState } from 'react';

function Controls({ onMove }) {
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [moveDirection, setMoveDirection] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onMove({ selectedCharacter, moveDirection });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Select Character:
                    <input
                        type="text"
                        value={selectedCharacter}
                        onChange={(e) => setSelectedCharacter(e.target.value)}
                        placeholder="e.g., A-P1"
                    />
                </label>
            </div>
            <div>
                <label>
                    Move Direction:
                    <input
                        type="text"
                        value={moveDirection}
                        onChange={(e) => setMoveDirection(e.target.value)}
                        placeholder="e.g., FL, FR, BL, BR"
                    />
                </label>
            </div>
            <button type="submit">Move</button>
        </form>
    );
}

export default Controls;
