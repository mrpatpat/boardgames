import { BaseEvent } from "./BaseEvent";

export class BaseErrorEvent extends BaseEvent {
    private message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }

}
