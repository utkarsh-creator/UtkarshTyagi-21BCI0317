import React from 'react';

function MoveHistory({ history }) {
    return (
        <div>
            <h3>Move History</h3>
            <ul>
                {history.map((move, index) => (
                    <li key={index}>{move}</li>
                ))}
            </ul>
        </div>
    );
}

export default MoveHistory;
