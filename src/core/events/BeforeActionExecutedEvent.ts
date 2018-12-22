import { BaseEvent } from "./BaseEvent";
import { Action } from "../Action";
import { Player } from "../Player";

export class BeforeActionExecutedEvent<T, P extends Player> extends BaseEvent {
    private action: Action<T, P>;

    constructor(action: Action<T, P>) {
        super();
        this.action = action;
    }

    public getAction(): Action<T, P> {
        return this.action;
    }
}
