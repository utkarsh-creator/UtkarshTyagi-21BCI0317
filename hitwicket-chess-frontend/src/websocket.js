import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS('http://localhost:8080/game');
    
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {},
        debug: (str) => {
            console.log('STOMP Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame) => {
            console.log('STOMP Connected:', frame);
            stompClient.subscribe('/topic/gameState', (message) => {
                console.log('Message received:', message);
                onMessageReceived(message);
            });
        },
        onStompError: (frame) => {
            console.error('STOMP Error:', frame);
        },
        onWebSocketClose: () => {
            console.log('WebSocket closed');
        },
        onWebSocketError: (error) => {
            console.error('WebSocket Error:', error);
        }
    });

    stompClient.activate();

    return {
        disconnect: () => {
            stompClient?.deactivate();
            console.log('STOMP Disconnected');
        }
    };
};

export const sendMoveCommand = (move) => {
    if (stompClient?.connected) {
        stompClient.publish({
            destination: '/app/move',
            body: JSON.stringify(move),
        });
        console.log('Move command sent:', move);
    } else {
        console.error('STOMP client not connected');
    }
};

export const sendDeploymentData = (deployment) => {
    if (stompClient?.connected) {
        stompClient.publish({
            destination: '/app/deployment',
            body: JSON.stringify(deployment),
        });
        console.log('Deployment data sent:', deployment);
    } else {
        console.error('STOMP client not connected');
    }
};
