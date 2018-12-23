import { Game } from "../../core/Game";
import { SolitaireState, buildInitialState } from "./SolitaireState";
import { StandardCard } from "../../cards-core/fifty-two-cards/StandardCard";

export class Solitaire extends Game<SolitaireState> {
    constructor() {
        super(buildInitialState());
    }

    public getFaceUpCardsFromAllTableaus():StandardCard[] {
        return this.getState()
            .tableaus.map(t => t.getCards())
            .reduce((x, y) => [...x, ...y])
            .filter(x => !x.isFaceDown());
    }
}
