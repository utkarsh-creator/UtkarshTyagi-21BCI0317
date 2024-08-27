package com._BCI0317.hitwicket.service;

import com._BCI0317.hitwicket.model.GameState;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    private static final int GRID_SIZE = 5;
    private final String[][] grid = new String[GRID_SIZE][GRID_SIZE];
    private String currentPlayer = "A";
    private boolean gameOver = false;
    private String winner;

    public GameService() {
        initializeGame();
    }

    public void initializeGame() {
        grid[0] = new String[]{"A-P1", "A-P2", "A-H1", "A-H2", "A-P3"};
        grid[4] = new String[]{"B-P1", "B-P2", "B-H1", "B-H2", "B-P3"};
        currentPlayer = "A";
        gameOver = false;
        winner = null;
    }

    public GameState getGameState() {
        return new GameState(grid, currentPlayer, gameOver, winner);
    }

    public boolean processMove(String character, String direction) {
        if (gameOver) {
            // Game is over, no moves allowed
            return false;
        }

        int[] pos = findCharacterPosition(character);
        if (pos == null) {
            // Character not found
            return false;
        }

        int row = pos[0];
        int col = pos[1];
        int newRow = row;
        int newCol = col;
        switch (direction) {
            case "L" -> newCol -= 1;
            case "R" -> newCol += 1;
            case "U" -> newRow -= 1;
            case "D" -> newRow += 1;
            default -> {
                return false; // Invalid direction
            }
        }

        if (isValidMove(newRow, newCol)) {
            grid[row][col] = null;
            grid[newRow][newCol] = character;

            if (checkForWin()) {
                gameOver = true;
                winner = currentPlayer;
            } else {
                currentPlayer = currentPlayer.equals("A") ? "B" : "A";
            }
            return true;
        }
        return false;
    }
    public boolean handleDeployment(String character, int position) {
        if (gameOver) {
            return false;
        }

        // Place character on the grid based on the position
        int row = position / GRID_SIZE;
        int col = position % GRID_SIZE;
        if (isValidMove(row, col)) {
            grid[row][col] = character;
            return true;
        }
        return false;
    }

    private int[] findCharacterPosition(String character) {
        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                if (character.equals(grid[row][col])) {
                    return new int[]{row, col};
                }
            }
        }
        return null;
    }

    private boolean isValidMove(int row, int col) {
        return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE && grid[row][col] == null;
    }

    private boolean checkForWin() {
        boolean aHasCharacters = false;
        boolean bHasCharacters = false;

        for (int row = 0; row < GRID_SIZE; row++) {
            for (int col = 0; col < GRID_SIZE; col++) {
                if (grid[row][col] != null) {
                    if (grid[row][col].startsWith("A-")) {
                        aHasCharacters = true;
                    } else if (grid[row][col].startsWith("B-")) {
                        bHasCharacters = true;
                    }
                }
            }
        }

        if (!aHasCharacters) {
            winner = "B";
            return true;
        } else if (!bHasCharacters) {
            winner = "A";
            return true;
        }
        return false;
    }

    public void startNewGame() {
        initializeGame();
    }
}
