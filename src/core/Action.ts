import { GameState } from "./GameState";

export abstract class Action<T extends GameState> {
    abstract isAllowed(state: T): boolean;
    abstract transform(state: T): T;
}
