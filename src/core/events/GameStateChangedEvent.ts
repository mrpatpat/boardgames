import { GameState } from "../GameState";
import { BaseEvent } from "./BaseEvent";

export class GameStateChangedEvent<T extends GameState> extends BaseEvent {
    private state: T;

    constructor(state: T) {
        super();
        this.state = state;
    }

    public getState(): T {
        return this.state;
    }
}