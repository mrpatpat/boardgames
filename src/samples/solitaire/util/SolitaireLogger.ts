import { EventLogger } from "../../../core/util/EventLogger";
import { SolitaireState } from "../SolitaireState";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { GameStateChangedEvent } from "../../../core/events/GameStateChangedEvent";
import { Game } from "../../../core/Game";
import { AfterActionExecutedEvent } from "../../../core/events/AfterActionExecutedEvent";

export class SolitaireLogger extends EventLogger<SolitaireState> {
    
    private game: Game<SolitaireState>|null = null;

    public connect(game: Game<SolitaireState>) {
        super.connect(game);
        this.game = game;
    }

    public log(e: BaseEvent) {
        switch (e.constructor) {
            case AfterActionExecutedEvent:
                super.log(e);
                this.logTableaus();
                break;
        }
    }

    private logTableaus() {
        if(this.game) {
            this.game.getState().tableaus.forEach((t, i) => {
                let tString = `tableau ${i} => `;
                t.getCards().forEach(c => {
                    tString += c.isFaceDown() ? "[]": `[${c.getName()}]`;
                });
                console.log(tString);
            })
        }
    }

}