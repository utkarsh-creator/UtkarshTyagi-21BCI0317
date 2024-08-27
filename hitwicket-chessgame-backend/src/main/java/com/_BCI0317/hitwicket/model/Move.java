package com._BCI0317.hitwicket.model;

public class Move {
    private String character;
    private String direction;

    public Move() {}

    public Move(String character, String direction) {
        this.character = character;
        this.direction = direction;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}
