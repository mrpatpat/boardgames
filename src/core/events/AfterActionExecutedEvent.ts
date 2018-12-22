import { BaseEvent } from "./BaseEvent";
import { Action } from "../Action";

export class AfterActionExecutedEvent<T> extends BaseEvent {
    private action: Action<T>;

    constructor(action: Action<T>) {
        super();
        this.action = action;
    }

    public getAction(): Action<T> {
        return this.action;
    }
}
