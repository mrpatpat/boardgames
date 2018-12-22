import { Action } from "../Action";
import { Player } from "../Player";
import { BaseErrorEvent } from "./BaseErrorEvent";

export class ActionNotAllowedEvent<T, P extends Player> extends BaseErrorEvent {
    private action: Action<T, P>;

    constructor(action: Action<T, P>, message: string) {
        super(message);
        this.action = action;
    }

    public getAction(): Action<T, P> {
        return this.action;
    }

}
