import { EventLogger } from "../../../core/util/EventLogger";
import { SolitaireState } from "../SolitaireState";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { Game } from "../../../core/Game";
import { AfterActionExecutedEvent } from "../../../core/events/AfterActionExecutedEvent";
import { ActionNotAllowedEvent } from "../../../core/events/ActionNotAllowedEvent";
import { StandardCardSuites, StandardCard } from "../../../cards-core/fifty-two-cards/StandardCard";
import {
    ConsoleBgBlack,
    ConsoleFgRed,
    ConsoleFgBlack,
    ConsoleFgWhite,
    ConsoleBgWhite,
    ConsoleReset,
    ConsoleFgBlue,
    ConsoleBgGreen
} from "../../../core/util/ConsoleColors";
import { BaseErrorEvent } from "../../../core/events/BaseErrorEvent";
import { WinEvent } from "../WinEvent";

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
            case ActionNotAllowedEvent:
                super.log(e);
                break;
            case BaseErrorEvent:
                super.log(e);
                break;
            case WinEvent:
                console.log(ConsoleBgGreen + ConsoleFgRed + "You have won!" + ConsoleReset);
                break;
        }
    }

    private logFoundations() {
        if (this.game) {
            this.game.getState().foundations.forEach((t, i) => {
                let tString = `foundation ${i} => `;
                t.getCards().forEach(c => {
                    const color = SolitaireLogger.getColorForSuit(c.getSuit());
                    tString += c.isFaceDown()
                        ? this.getStackBelowString()
                        : SolitaireLogger.getOpenCardString(c);
                });
                console.log(tString);
            });
        }
    }

    private logStock() {
        if (this.game) {
            const s = this.game.getState().stock;
            let sString = `stock => `;
            s.getCards().forEach(c => {
                sString += this.getStackBelowString();
            });
            console.log(sString + (s.getCards().length === 0 ? "":"]"));
        }
    }

    private logTalon() {
        if (this.game) {
            const t = this.game.getState().talon;
            let tString = `talon => `;
            t.getCards().forEach((c, i) => {
                tString += c.isFaceDown() ? this.getStackBelowString() : SolitaireLogger.getOpenCardString(c);
                tString += c.isFaceDown() && i === t.getCards().length - 1 ? "]":"";
            });
            console.log(tString);
        }
    }

    private logTableaus() {
        if (this.game) {
            this.game.getState().tableaus.forEach((t, i) => {
                let tString = `tableau ${i} => `;
                t.getCards().forEach(c => {
                    const color = SolitaireLogger.getColorForSuit(c.getSuit());
                    tString += c.isFaceDown()
                        ? this.getStackBelowString()
                        : SolitaireLogger.getOpenCardString(c);
                });
                console.log(tString);
            });
        }
    }

    private getStackBelowString(): string {
        return `${ConsoleFgWhite}[${ConsoleReset}`;
    }

    public static getOpenCardString(c: StandardCard): string {
        const color = SolitaireLogger.getColorForSuit(c.getSuit());
        return `[${color}${c.getName()}${ConsoleReset}]`;
    }

    public static getColorForSuit(suit: StandardCardSuites) {
        switch (suit) {
            case StandardCardSuites.Clubs:
            case StandardCardSuites.Spades:
                return ConsoleFgWhite;
            case StandardCardSuites.Hearts:
            case StandardCardSuites.Diamonds:
                return ConsoleFgRed;
            default:
                return ConsoleFgWhite;
        }
    }
}
