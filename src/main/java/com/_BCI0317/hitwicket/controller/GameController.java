package com._BCI0317.hitwicket.controller;

import com._BCI0317.hitwicket.model.GameState;
import com._BCI0317.hitwicket.model.Move;
import com._BCI0317.hitwicket.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    @Autowired
    private GameService gameService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/move")
    public void handleMove(Move move) {
        if (move == null || move.getCharacter() == null || move.getDirection() == null) {
            logger.warn("Received invalid move: {}", move);
            return;
        }

        try {
            boolean moveProcessed = gameService.processMove(move.getCharacter(), move.getDirection());
            GameState gameState = gameService.getGameState();
            messagingTemplate.convertAndSend("/topic/gameState", gameState);
        } catch (Exception e) {
            logger.error("Error processing move: {}", move, e);
            messagingTemplate.convertAndSend("/topic/gameState", gameService.getGameState());
        }
    }

    @MessageMapping("/newGame")
    public void handleNewGame() {
        try {
            gameService.startNewGame();
            GameState gameState = gameService.getGameState();
            messagingTemplate.convertAndSend("/topic/gameState", gameState);
        } catch (Exception e) {
            logger.error("Error starting new game", e);
        }
    }
}
