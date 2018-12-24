import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import {
    StandardCard,
    StandardCardSuites
} from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class MoveFromTalonToTableau extends SolitaireAction {
    constructor(private tableauTarget: StandardCardStack) {
        super();
    }

    isAllowed(state: SolitaireState): boolean {
        return (
            state.talon.peek() &&
            !state.talon.peek().isFaceDown() &&
            ((this.cardHasCorrectSuiteForTargetTableau(state) &&
                (this.cardsValueIsOneLowerThanTargetsValue(state) ||
                    this.cardIsAceAndTargetIsTwo(state))) ||
                this.tableauTarget.getCards().length === 0)
        );
    }

    transform(state: SolitaireState): SolitaireState {
        this.pushTalonCardToTableau(state);
        return state;
    }

    private pushTalonCardToTableau(state: SolitaireState) {
        const talonCard = state.talon.draw();
        if (talonCard) {
            this.tableauTarget.push(talonCard);
        }
    }

    private cardIsAceAndTargetIsTwo(state: SolitaireState): boolean {
        const target = this.tableauTarget.peek();
        if (target) {
            return (
                state.talon.peek() &&
                state.talon.peek().getValue() === 14 &&
                target.getValue() === 2
            );
        } else return false;
    }

    private cardsValueIsOneLowerThanTargetsValue(
        state: SolitaireState
    ): boolean {
        const target = this.tableauTarget.peek();
        if (target) {
            return (
                state.talon.peek() &&
                state.talon.peek().getValue() + 1 === target.getValue()
            );
        } else return false;
    }

    private cardHasCorrectSuiteForTargetTableau(
        state: SolitaireState
    ): boolean {
        const target = this.tableauTarget.peek();
        if (target && state.talon.peek()) {
            switch (state.talon.peek().getSuit()) {
                case StandardCardSuites.Clubs:
                case StandardCardSuites.Spades:
                    return (
                        target.getSuit() === StandardCardSuites.Hearts ||
                        target.getSuit() === StandardCardSuites.Diamonds
                    );
                case StandardCardSuites.Hearts:
                case StandardCardSuites.Diamonds:
                    return (
                        target.getSuit() === StandardCardSuites.Clubs ||
                        target.getSuit() === StandardCardSuites.Spades
                    );
                default:
                    return false;
            }
        } else return false;
    }
}
