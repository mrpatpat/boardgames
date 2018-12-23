import { EventLogger } from "../../../core/util/EventLogger";
import { SolitaireState } from "../SolitaireState";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { Game } from "../../../core/Game";
import { AfterActionExecutedEvent } from "../../../core/events/AfterActionExecutedEvent";

export class SolitaireLogger extends EventLogger<SolitaireState> {
    private game: Game<SolitaireState> | null = null;

    public connect(game: Game<SolitaireState>) {
        super.connect(game);
        this.game = game;
    }

    public log(e: BaseEvent) {
        switch (e.constructor) {
            case AfterActionExecutedEvent:
                super.log(e);
                this.logStock();
                this.logTalon();
                this.logFoundations();
                this.logTableaus();
                break;
        }
    }

    private logFoundations() {
        if (this.game) {
            this.game.getState().foundations.forEach((f, i) => {
                let fString = `foundation ${i} => `;
                fString += f.getCards().length === 0 ? "" : `[${f.peek().getName()}]`;
                console.log(fString);
            });
        }
    }

    private logStock() {
        if (this.game) {
            const s = this.game.getState().stock;
            let sString = `stock => `;
            s.getCards().forEach(c => {
                sString += "[]";
            });
            console.log(sString);
        }
    }

    private logTalon() {
        if (this.game) {
            const t = this.game.getState().talon;
            let tString = `talon => `;
            t.getCards().forEach((c,i) => {
                tString += c.isFaceDown() ? "[]" : `[${c.getName()}]`;
            });
            console.log(tString);
        }
    }

    private logTableaus() {
        if (this.game) {
            this.game.getState().tableaus.forEach((t, i) => {
                let tString = `tableau ${i} => `;
                t.getCards().forEach(c => {
                    tString += c.isFaceDown() ? "[]" : `[${c.getName()}]`;
                });
                console.log(tString);
            });
        }
    }
}
