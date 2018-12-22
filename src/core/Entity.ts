import { Game } from "./Game";
import { Player } from "./Player";

export abstract class Entity<T, P extends Player> {
    constructor(private game: Game<T, P>) {
        this.afterConstruction(game);
    }

    abstract afterConstruction(game: Game<T, P>): void;
}
