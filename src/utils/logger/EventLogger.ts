import { Subscription } from "rxjs";
import { BaseEvent } from "../../core/events/BaseEvent";
import { ConsoleFgBlue, ConsoleReset, ConsoleFgYellow, ConsoleFgRed } from "./ConsoleColors";
import { GameStateChangedEvent } from "../../core/events/GameStateChangedEvent";
import { BeforeActionExecutedEvent } from "../../core/events/BeforeActionExecutedEvent";
import { Action } from "../../core/Action";
import { AfterActionExecutedEvent } from "../../core/events/AfterActionExecutedEvent";
import { BaseErrorEvent } from "../../core/events/BaseErrorEvent";
import { ActionNotAllowedEvent } from "../../core/events/ActionNotAllowedEvent";
import { GameState } from "../../core/GameState";
import { Game } from "../../core/Game";

export class EventLogger<T extends GameState> {
    private subscription?: Subscription = undefined;

    public connect(game: Game<T>) {
        this.subscription = game.$getEventStream().subscribe(e => this.log(e));
    }

    public log(e: BaseEvent) {
        switch (e.constructor) {
            case GameStateChangedEvent:
                console.log(this.getStyledClassName(e));
                break;
            case BeforeActionExecutedEvent:
            case AfterActionExecutedEvent:
                const a = (e as BeforeActionExecutedEvent<T>).getAction();    
                console.log(this.getStyledClassName(e), "\t", this.getStyledActionName(a));
                break;
            case BaseErrorEvent:
                console.log(this.getStyledErrorName(e));
                break;
            case ActionNotAllowedEvent:
                const b = (e as ActionNotAllowedEvent<T>).getAction();    
                console.log(this.getStyledErrorName(e), "\t\t", this.getStyledActionName(b));
                break;
            default:
                console.log(this.getStyledClassName(e));
                break;
        }
    }

    public getStyledErrorName(e: BaseEvent): string {
        return ConsoleFgRed + e.constructor.name + ConsoleReset;
    }

    public getStyledClassName(e: BaseEvent): string {
        return ConsoleFgYellow + e.constructor.name + ConsoleReset;
    }

    public getStyledActionName(action: Action<T>): string {
        return ConsoleFgBlue + action.constructor.name + ConsoleReset;
    }

    public disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
