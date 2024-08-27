import React from 'react';

function GameBoard({ board }) {
    const flattenedBoard = Array.isArray(board) && board.every(Array.isArray) 
        ? board.reduce((acc, row) => acc.concat(row), []) 
        : [];
        
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px' }}>
            {flattenedBoard.map((cell, index) => (
                <div key={index} style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cell ? '#ccc' : '#fff'
                }}>
                    {cell}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;
