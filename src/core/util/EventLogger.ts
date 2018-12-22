import { Observable, Subscription } from "rxjs";
import { BaseEvent } from "../events/BaseEvent";
import { ConsoleBgYellow, ConsoleFgBlue, ConsoleReset, ConsoleFgYellow, ConsoleFgRed, ConsoleFgGreen } from "./ConsoleColors";
import { GameStateChangedEvent } from "../events/GameStateChangedEvent";
import { BeforeActionExecutedEvent } from "../events/BeforeActionExecutedEvent";
import { Action } from "../Action";
import { Player } from "../Player";
import { AfterActionExecutedEvent } from "../events/AfterActionExecutedEvent";
import { BaseErrorEvent } from "../events/BaseErrorEvent";
import { ActionNotAllowedEvent } from "../events/ActionNotAllowedEvent";

export class EventLogger<T,P extends Player> {
    private subscription: Subscription | null = null;

    public connect($events: Observable<BaseEvent>) {
        this.subscription = $events.subscribe(e => this.log(e));
    }

    private log(e: BaseEvent) {
        switch (e.constructor) {
            case GameStateChangedEvent:
                console.log(this.getStyledClassName(e));
                break;
            case BeforeActionExecutedEvent:
            case AfterActionExecutedEvent:
                const a = (e as BeforeActionExecutedEvent<T, P>).getAction();    
                console.log(this.getStyledClassName(e), "\t", this.getStyledActionName(a), this.getStyledActionPlayerName(a));
                break;
            case BaseErrorEvent:
                console.log(this.getStyledErrorName(e));
                break;
            case ActionNotAllowedEvent:
                const b = (e as ActionNotAllowedEvent<T, P>).getAction();    
                console.log(this.getStyledErrorName(e), "\t\t", this.getStyledActionName(b), this.getStyledActionPlayerName(b));
                break;
            default:
                console.log(this.getStyledClassName(e));
                break;
        }
    }

    private getStyledErrorName(e: BaseEvent): string {
        return ConsoleFgRed + e.constructor.name + ConsoleReset;
    }

    private getStyledClassName(e: BaseEvent): string {
        return ConsoleFgYellow + e.constructor.name + ConsoleReset;
    }

    private getStyledActionName(action: Action<T,P>): string {
        return ConsoleFgBlue + action.constructor.name + ConsoleReset;
    }

    private getStyledActionPlayerName(action: Action<T,P>): string {
        return ConsoleFgBlue + "by " + action.origin.name + ConsoleReset;
    }

    public disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
