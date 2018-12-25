import { Game } from './Game';
import { Action } from './Action';

describe('Game', () => {
    it('should set the given inital state at the start of the game', () => {
        const gameState = {
            players: [{
                name: "Adrian"
            }, {
                name: "Fatih"
            }],
            currentPlayer: 0
        };

        const game = new Game(gameState);

        expect(game.getState()).toEqual(gameState);
    });

    it('should change the game state when an action is executed', () => {
        const initalGameState = {
            currentPlayer: 0
        };
        const expectedGameState = {
            currentPlayer: 1
        };
        const game = new Game(initalGameState);
        const nextPlayerAction = {
            isAllowed(): boolean {
                return true;
            },
            transform(state: {currentPlayer: number}): {currentPlayer: number} {
                return {currentPlayer: state.currentPlayer + 1};
            }
        };

        game.execute(nextPlayerAction);

        expect(game.getState()).toEqual(expectedGameState);
    });

    it('should not change the game state when a given action is not allowed', () => {
        const initalGameState = {
            currentPlayer: 0
        };
        const game = new Game(initalGameState);
        const nextPlayerAction = {
            isAllowed(): boolean {
                return false;
            },
            transform(state: {currentPlayer: number}): {currentPlayer: number} {
                return {currentPlayer: state.currentPlayer + 1};
            }
        };

        game.execute(nextPlayerAction);

        expect(game.getState()).toEqual(initalGameState);
    })
});