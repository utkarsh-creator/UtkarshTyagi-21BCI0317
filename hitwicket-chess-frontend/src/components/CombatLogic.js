function CombatLogic(gameState, move) {
    const { selectedCharacter, moveDirection } = move;
    const { board, currentPlayer } = gameState;

    const updatedBoard = board.map(row => row.slice());
    const updatedMoveHistory = [...gameState.moveHistory, `${selectedCharacter}: ${moveDirection}`];

    // Find the current position of the selected character
    let currentPos = null;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (updatedBoard[row][col] === selectedCharacter) {
                currentPos = { row, col };
                break;
            }
        }
        if (currentPos) break;
    }

    if (!currentPos) {
        console.error("Character not found on the board.");
        return { ...gameState };
    }

    const { row, col } = currentPos;
    let newRow = row, newCol = col;

    // Determine new position based on moveDirection
    switch (moveDirection) {
        case 'U':
            newRow = row - 1;
            break;
        case 'D':
            newRow = row + 1;
            break;
        case 'L':
            newCol = col - 1;
            break;
        case 'R':
            newCol = col + 1;
            break;
        default:
            console.error("Invalid move direction.");
            return { ...gameState };
    }

    // Validate new position
    if (newRow < 0 || newRow >= 5 || newCol < 0 || newCol >= 5) {
        console.error("Move out of bounds.");
        return { ...gameState };
    }

    // Handle combat logic
    const opponentPrefix = currentPlayer === 'A' ? 'B-' : 'A-';
    const isHero = selectedCharacter.endsWith('H1') || selectedCharacter.endsWith('H2');

    if (isHero) {
        // Remove all opponent characters in the path for Hero1 and Hero2
        if (moveDirection === 'UP' || moveDirection === 'DOWN') {
            for (let i = Math.min(row, newRow); i <= Math.max(row, newRow); i++) {
                if (updatedBoard[i][col] && updatedBoard[i][col].startsWith(opponentPrefix)) {
                    updatedBoard[i][col] = null;
                }
            }
        } else if (moveDirection === 'LEFT' || moveDirection === 'RIGHT') {
            for (let i = Math.min(col, newCol); i <= Math.max(col, newCol); i++) {
                if (updatedBoard[row][i] && updatedBoard[row][i].startsWith(opponentPrefix)) {
                    updatedBoard[row][i] = null;
                }
            }
        }
    } else {
        // Regular characters remove only the opponent at the final position
        if (updatedBoard[newRow][newCol] && updatedBoard[newRow][newCol].startsWith(opponentPrefix)) {
            updatedBoard[newRow][newCol] = null;
        }
    }

    // Move the selected character to the new position
    updatedBoard[row][col] = null;
    updatedBoard[newRow][newCol] = selectedCharacter;

    // Check if the game is over
    const gameOver = !updatedBoard.flat().some(cell => cell && cell.startsWith(opponentPrefix));
    const winner = gameOver ? currentPlayer : null;

    return {
        updatedBoard,
        updatedMoveHistory,
        gameOver,
        winner,
    };
}

export default CombatLogic;
