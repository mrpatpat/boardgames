import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import {
    StandardCard,
    StandardCardSuites
} from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class MoveFromTableauToTableau extends SolitaireAction {
    constructor(
        private card: StandardCard,
        private tableauOrigin: StandardCardStack,
        private tableauTarget: StandardCardStack
    ) {
        super();
    }

    isAllowed(state: SolitaireState): boolean {
        return this.tableauTarget.getCards().length === 0 || (
            this.tableauOrigin !== this.tableauTarget &&
            this.cardHasCorrectSuiteForTargetTableau() &&
            (this.cardsValueIsOneLowerThanTargetsValue() ||
                this.cardIsAceAndTargetIsTwo())
        );
    }

    transform(state: SolitaireState): SolitaireState {
        this.pushSelectedCardAndAllBelowToTableau();
        this.makeTopCardVisibleIfNecessary();
        return state;
    }

    private pushSelectedCardAndAllBelowToTableau() {
        const stack = new StandardCardStack();
        let drawn = this.tableauOrigin.draw()!;
        while(drawn !== this.card) {
            stack.push(drawn);
            drawn = this.tableauOrigin.draw()!;
        }
        stack.push(drawn);

        if (stack) {
            this.tableauTarget.push(...stack.getCards().reverse());
        }
    }

    private makeTopCardVisibleIfNecessary() {
        const nextOnTableau = this.tableauOrigin.peek();
        if (nextOnTableau && nextOnTableau.isFaceDown()) {
            nextOnTableau.setFaceDown(false);
        }
    }

    private cardIsAceAndTargetIsTwo(): boolean {
        const target = this.tableauTarget.peek();
        if (target) {
            return this.card.getValue() ===  14 && target.getValue() === 2;
        } else return false;
    }

    private cardsValueIsOneLowerThanTargetsValue(): boolean {
        const target = this.tableauTarget.peek();
        if (target) {
            return this.card.getValue() + 1 === target.getValue();
        } else return false;
    }

    private cardHasCorrectSuiteForTargetTableau(): boolean {
        const target = this.tableauTarget.peek();
        if (target) {
            switch (this.card.getSuit()) {
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
