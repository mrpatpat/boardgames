import { BaseEvent } from "./BaseEvent";
import { Action } from "../Action";
import { GameState } from "../GameState";

export class AfterActionExecutedEvent<T extends GameState> extends BaseEvent {
    private action: Action<T>;

    constructor(action: Action<T>) {
        super();
        this.action = action;
    }

    public getAction(): Action<T> {
        return this.action;
    }
}
