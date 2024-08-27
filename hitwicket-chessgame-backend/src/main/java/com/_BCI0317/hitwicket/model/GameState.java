package com._BCI0317.hitwicket.model;

public class GameState {
    private String[][] grid;
    private String currentPlayer;
    private boolean gameOver;
    private String winner;

    public GameState(String[][] grid, String currentPlayer, boolean gameOver, String winner) {
        this.grid = grid;
        this.currentPlayer = currentPlayer;
        this.gameOver = gameOver;
        this.winner = winner;
    }

    public String[][] getGrid() {
        return grid;
    }

    public void setGrid(String[][] grid) {
        this.grid = grid;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(String currentPlayer) {
        this.currentPlayer = currentPlayer;
    }

    public boolean isGameOver() {
        return gameOver;
    }

    public void setGameOver(boolean gameOver) {
        this.gameOver = gameOver;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }
}
