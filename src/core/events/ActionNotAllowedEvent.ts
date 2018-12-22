import { Action } from "../Action";
import { BaseErrorEvent } from "./BaseErrorEvent";
import { GameState } from "../GameState";

export class ActionNotAllowedEvent<T extends GameState> extends BaseErrorEvent {
    private action: Action<T>;

    constructor(action: Action<T>, message: string) {
        super(message);
        this.action = action;
    }

    public getAction(): Action<T> {
        return this.action;
    }
}
