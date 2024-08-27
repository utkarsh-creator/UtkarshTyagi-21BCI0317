import React, { useEffect, useState } from 'react';
import GameBoard from './components/Board';
import Controls from './components/Controls';
import CurrentPlayer from './components/CurrentPlayer';
import DeploymentForm from './components/DeploymentForm';
import MoveHistory from './components/MoveHistory';
import { connectWebSocket, sendDeploymentData, sendMoveCommand } from './websocket';

function App() {
    const [gameState, setGameState] = useState({
        currentPlayer: 'A',
        board: Array(5).fill(null).map(() => Array(5).fill(null)),
        moveHistory: [],
        gameOver: false,
        winner: null,
    });

    useEffect(() => {
        const { disconnect } = connectWebSocket((message) => {
            const newState = JSON.parse(message.body);
            console.log('Updated game state:', newState);
            setGameState(newState);
        });

        return () => {
            disconnect();
        };
    }, []);

    const handleDeployment = (deployment) => {
        console.log('Deployment data received:', deployment);
        sendDeploymentData(deployment);
        
        const combinedBoard = Array(5).fill(null).map((_, rowIndex) => {
            if (rowIndex === 0) {
                return deployment.teamA;
            } else if (rowIndex === 4) {
                return deployment.teamB;
            } else {
                return Array(5).fill(null);
            }
        });

        setGameState((prevState) => ({
            ...prevState,
            board: combinedBoard,
        }));
    };

    const handleMove = (move) => {
        sendMoveCommand(move);
    };

    return (
        <div>
            <h1>5x5 Strategy Game</h1>
            {!gameState.gameOver ? (
                <>
                    <DeploymentForm onDeploy={handleDeployment} />
                    <GameBoard board={gameState.board} />
                    <CurrentPlayer player={gameState.currentPlayer} />
                    <MoveHistory history={gameState.moveHistory} />
                    <Controls onMove={handleMove} />
                </>
            ) : (
                <h2>Game Over! Winner: {gameState.winner}</h2>
            )}
        </div>
    );
}

export default App;
