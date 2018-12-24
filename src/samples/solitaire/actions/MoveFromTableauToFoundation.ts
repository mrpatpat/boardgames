import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import { StandardCard } from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";
export class MoveFromTableauToFoundation extends SolitaireAction {
    constructor(
        private card: StandardCard,
        private tableau: StandardCardStack,
        private foundation: StandardCardStack
    ) {
        super();
    }

    isAllowed(state: SolitaireState): boolean {
        return this.cardIsonTopOfTableau() && (
            this.cardIsAceAndFoundationIsEmpty() ||
            this.cardIsTwoAndFoundationIsAceOfSameSuit() ||
            this.cardIsThreeOrHigherAndFoundationIsOneLowerAndSameSuit()
        );
    }

    transform(state: SolitaireState): SolitaireState {
        this.pushSelectedCardAndAllBelowToFoundation();
        this.makeTopCardVisibleIfNecessary();
        return state;
    }

    private pushSelectedCardAndAllBelowToFoundation() {
        const drawn = this.tableau.draw();
        if (drawn && drawn === this.card) {
            const f = this.foundation.peek();
            if (f) {
                f.setFaceDown(true);
            }
            this.foundation.push(drawn);
        }
    }

    private makeTopCardVisibleIfNecessary() {
        const nextOnTableau = this.tableau.peek();
        if (nextOnTableau && nextOnTableau.isFaceDown()) {
            nextOnTableau.setFaceDown(false);
        }
    }

    private cardIsThreeOrHigherAndFoundationIsOneLowerAndSameSuit(): boolean {
        return (
            this.card.getValue() >= 3 &&
            this.foundation.getCards().length >= 2 &&
            this.foundation.peek() &&
            this.foundation.peek().getValue() === this.card.getValue() - 1 &&
            this.foundation.peek().getSuit() == this.card.getSuit()
        );
    }

    private cardIsTwoAndFoundationIsAceOfSameSuit(): boolean {
        return (
            this.foundation.getCards().length === 1 &&
            this.foundation.peek() &&
            this.foundation.peek().getSuit() == this.card.getSuit() &&
            this.card.getValue() === 2
        );
    }

    private cardIsonTopOfTableau(): boolean {
        return (
            this.tableau.peek() &&
            this.tableau.peek() === this.card
        );
    }

    private cardIsAceAndFoundationIsEmpty(): boolean {
        return (
            this.foundation.getCards().length === 0 &&
            this.card.getValue() === 14
        );
    }
}
