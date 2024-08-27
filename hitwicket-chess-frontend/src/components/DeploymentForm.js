import React, { useState } from 'react';

function DeploymentForm({ onDeploy }) {
    const [teamA, setTeamA] = useState(["A-P1", "A-H1", "A-H2", "A-P2", "A-P3"]);
    const [teamB, setTeamB] = useState(["B-P1", "B-H1", "B-H2", "B-P2", "B-P3"]);

    const handleChange = (e, setTeam) => {
    const input = e.target.value.split(',').map(item => item.trim());
    const isValid = validateInput(input);
    if (isValid) {
        setTeam(input);
    } else {
        alert("Invalid team configuration! Make sure you have a total of 5 characters consisting of any combination of Pawns (P1, P2, P3), Hero1 (H1), and Hero2 (H2).");
    }
    };

    const validateInput = (input) => {
    if (input.length !== 5) return false;

    const validCharacters = ["P1", "P2", "P3", "H1", "H2"];
    const counts = input.reduce((acc, item) => {
        const type = item.split('-')[1];
        if (validCharacters.includes(type)) {
        acc[type] = (acc[type] || 0) + 1;
        } else {
        acc.invalid = true;
        }
        return acc;
    }, {});

    return !counts.invalid;
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    onDeploy({ teamA, teamB });
    };

    return (
    <form onSubmit={handleSubmit}>
        <h3>Deploy Your Characters</h3>
        <div>
        <label>Team A Deployment (e.g., A-P1, A-H1, A-H2, A-P2, A-P3): </label>
        <input
            type="text"
            value={teamA.join(', ')}
            onChange={(e) => handleChange(e, setTeamA)}
        />
        </div>
        <div>
        <label>Team B Deployment (e.g., B-P1, B-H1, B-H2, B-P2, B-P3): </label>
        <input
            type="text"
            value={teamB.join(', ')}
            onChange={(e) => handleChange(e, setTeamB)}
        />
        </div>
        <button type="submit">Start Game</button>
        </form>
    );
}

export default DeploymentForm;
