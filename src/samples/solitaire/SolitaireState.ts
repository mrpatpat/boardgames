import { GameState } from "../../core/GameState";
import { StandardCardStack } from "../../cards-core/fifty-two-cards/StandardCardStack";

export interface SolitaireState extends GameState {
    tableaus: StandardCardStack[];
    foundations: StandardCardStack[];
    stock: StandardCardStack;
    talon: StandardCardStack;
}

export const buildInitialState: () => SolitaireState = () => {
    return {
        tableaus: [
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack()
        ],
        foundations: [
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack(),
            new StandardCardStack()
        ],
        stock: new StandardCardStack(),
        talon: new StandardCardStack()
    };
};
