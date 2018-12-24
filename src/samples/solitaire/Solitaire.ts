import { Game } from "../../core/Game";
import { SolitaireState, buildInitialState } from "./SolitaireState";
import { StandardCard } from "../../cards-core/fifty-two-cards/StandardCard";
import { CardStack } from "../../cards-core/CardStack";
import { StandardCardStack } from "../../cards-core/fifty-two-cards/StandardCardStack";
import { filter, map } from "rxjs/operators";
import { AfterActionExecutedEvent } from "../../core/events/AfterActionExecutedEvent";
import { Observable } from "rxjs";
import { WinEvent } from "./WinEvent";
import { NewGame } from "./actions/NewGame";

export class Solitaire extends Game<SolitaireState> {
    constructor() {
        super(buildInitialState());

        this.$afterAction.subscribe(() => {
            const n = this.getState()
                .foundations.map(x => x.getCards().length)
                .reduce((x, y) => x + y);
            if (n >= 52) {
                this.$events.next(new WinEvent());
            }
        });
    }

    public getTableauForCard(c: StandardCard): StandardCardStack | undefined {
        return this.getState().tableaus.find(
            t => t.getCards().indexOf(c) != -1
        );
    }
}
