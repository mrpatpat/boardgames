import { SolitaireState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import { StandardCard } from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class NewGame extends SolitaireAction {
    isAllowed(state: SolitaireState): boolean {
        return (
            state.tableaus.length === 7 &&
            StandardCard.buildDeck().getCards().length === 52
        );
    }
    transform(state: SolitaireState): SolitaireState {
        const cards = StandardCard.buildDeck();
        cards.shuffle();
        this.formTableau(cards, state);
        return { ...state };
    }

    private formTableau(cards: StandardCardStack, state: SolitaireState) {
        const tableaus = state.tableaus;
        for (
            let startingColumn = 0;
            startingColumn < tableaus.length;
            startingColumn++
        ) {
            const tableau = tableaus[startingColumn];
            for (let i = 0; i < startingColumn; i++) {
                this.dealToStack(cards, tableau, true);
            }
            this.dealToStack(cards, tableau, false);
        }
    }

    private dealToStack(
        cards: StandardCardStack,
        stack: StandardCardStack,
        faceDown: boolean
    ) {
        const toDeal = cards.draw();
        if (toDeal) {
            toDeal.setFaceDown(faceDown);
            stack.push(toDeal);
        }
    }
}
