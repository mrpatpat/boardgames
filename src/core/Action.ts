import { Player } from "./Player";

export abstract class Action<T> {

    public origin: Player;
    
    abstract isAllowed(state: T): boolean;
    abstract transform(state: T): T;

    constructor(origin: Player) {
        this.origin = origin;
    }

}