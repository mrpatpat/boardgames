import { Game } from "./Game";

export abstract class Entity<T> {

    constructor(private game: Game<T>) {
        this.afterConstruction(game);
    }

    abstract afterConstruction(game: Game<T>): void;
    
}