import { SolitaireState, buildInitialState } from "../SolitaireState";
import { SolitaireAction } from "./SolitaireAction";
import { StandardCard } from "../../../cards-core/fifty-two-cards/StandardCard";
import { StandardCardStack } from "../../../cards-core/fifty-two-cards/StandardCardStack";

export class StockToTalon extends SolitaireAction {
    isAllowed(state: SolitaireState): boolean {
        return true;
    }
    transform(state: SolitaireState): SolitaireState {
        if (state.stock.getCards().length === 0) {
            const cards = state.talon.drawMany(state.talon.getCards().length);
            cards.forEach(c => c.setFaceDown(true));
            state.stock.push(...cards);
        } else {
            const drawn = state.stock.draw();
            const currentOpenOnTalon = state.talon.peek();

            if (drawn) {
                if (currentOpenOnTalon) {
                    currentOpenOnTalon.setFaceDown(true);
                }
                drawn.setFaceDown(false);
                state.talon.push(drawn);
            }
        }

        return state;
    }
}
