import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import {
    StandardCard,
    StandardCardSuites
} from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class MoveFromTalonToFoundation extends SolitaireAction {
    constructor(private foundationTarget: StandardCardStack) {
        super();
    }

    isAllowed(state: SolitaireState): boolean {
        return (
            state.talon.peek() &&
            !state.talon.peek().isFaceDown() &&
            (this.cardIsAceAndFoundationIsEmpty(state) ||
            this.cardIsTwoAndFoundationIsAceOfSameSuit(state) ||
            this.cardIsThreeOrHigherAndFoundationIsOneLowerAndSameSuit(state))
        );
    }

    transform(state: SolitaireState): SolitaireState {
        this.pushTalonCardToFoundation(state);
        return state;
    }

    private pushTalonCardToFoundation(state: SolitaireState) {
        const talonCard = state.talon.draw();
        if (talonCard) {
            this.foundationTarget.push(talonCard);
        }
    }

    private cardIsThreeOrHigherAndFoundationIsOneLowerAndSameSuit(state: SolitaireState): boolean {
        return (
            state.talon.peek() &&
            state.talon.peek().getValue() >= 3 &&
            this.foundationTarget.getCards().length >= 2 &&
            this.foundationTarget.peek() &&
            this.foundationTarget.peek().getValue() === state.talon.peek().getValue() - 1 &&
            this.foundationTarget.peek().getSuit() == state.talon.peek().getSuit()
        );
    }

    private cardIsTwoAndFoundationIsAceOfSameSuit(state: SolitaireState): boolean {
        return (
            state.talon.peek() &&
            this.foundationTarget.getCards().length === 1 &&
            this.foundationTarget.peek() &&
            this.foundationTarget.peek().getSuit() == state.talon.peek().getSuit() &&
            state.talon.peek().getValue() === 2
        );
    }

    private cardIsAceAndFoundationIsEmpty(state: SolitaireState): boolean {
        return (
            state.talon.peek() &&
            this.foundationTarget.getCards().length === 0 &&
            state.talon.peek().getValue() === 14
        );
    }
}
