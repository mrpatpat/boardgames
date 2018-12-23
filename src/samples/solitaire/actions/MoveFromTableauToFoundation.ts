import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import { StandardCard } from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class MoveFromTableauToFoundation extends SolitaireAction {
    constructor(
        private card: StandardCard,
        private foundation: StandardCardStack
    ) {
        super();
    }

    isAllowed(state: SolitaireState): boolean {
        return true;
    }
    transform(state: SolitaireState): SolitaireState {
        // TODO implement
        return state;
    }
}
