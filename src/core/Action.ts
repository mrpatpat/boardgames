import { Player } from "./Player";

export abstract class Action<T, P extends Player> {
    public origin: P;

    abstract isAllowed(state: T): boolean;
    abstract transform(state: T): T;

    constructor(origin: P) {
        this.origin = origin;
    }
}
