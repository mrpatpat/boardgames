import { Observable, Subscription } from "rxjs";
import { BaseEvent } from "../events/BaseEvent";
import { ConsoleBgYellow, ConsoleFgBlue, ConsoleReset, ConsoleFgYellow, ConsoleFgRed, ConsoleFgGreen } from "./ConsoleColors";
import { GameStateChangedEvent } from "../events/GameStateChangedEvent";
import { BeforeActionExecutedEvent } from "../events/BeforeActionExecutedEvent";
import { Action } from "../Action";
import { AfterActionExecutedEvent } from "../events/AfterActionExecutedEvent";
import { BaseErrorEvent } from "../events/BaseErrorEvent";
import { ActionNotAllowedEvent } from "../events/ActionNotAllowedEvent";
import { GameState } from "../GameState";
import { Game } from "../Game";

export class EventLogger<T extends GameState> {
    private subscription: Subscription | null = null;

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
