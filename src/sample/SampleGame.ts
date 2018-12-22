import { Game } from "../core/Game";
import { Action } from "../core/Action";
import { Player } from "../core/Player";
import { Entity } from "../core/Entity";
import { filter } from "rxjs/operators";
import { GameState } from "../core/GameState";

export interface ISampleState extends GameState{
    turn: number;
    player: Player;
    playedMonsters: Monster[];
}

export class NextTurn extends Action<ISampleState, Player> {
    isAllowed(state: ISampleState): boolean {
        return true;
    }
    transform(state: ISampleState): ISampleState {
        return { ...state, turn: state.turn + 1 };
    }
}

export class PlayMonster extends Action<ISampleState, Player> {
    public monster: Monster;

    constructor(origin: Player, monster: Monster) {
        super(origin);
        this.monster = monster;
    }

    isAllowed(state: ISampleState): boolean {
        return true;
    }
    transform(state: ISampleState): ISampleState {
        return {
            ...state,
            playedMonsters: [...state.playedMonsters, this.monster]
        };
    }
}

export class NukeMonsters extends Action<ISampleState, Player> {
    isAllowed(state: ISampleState): boolean {
        return state.turn % 2 === 0;
    }
    transform(state: ISampleState): ISampleState {
        return { ...state, playedMonsters: [] };
    }
}

export class Monster extends Entity<ISampleState, Player> {
    afterConstruction(game: Game<ISampleState, Player>): void {
        // after this has been played
        const $played = game.$afterAction
            .pipe(
                filter(a => a instanceof PlayMonster),
                filter(a => (a as PlayMonster).monster === this)
            )
            .subscribe(() => {
                console.log("I have been played!");
            });

        // after this has been nuked
        const $nuked = game.$beforeAction
            .pipe(filter(a => a instanceof NukeMonsters))
            .subscribe(() => {
                console.log("I have been nuked!");
                $played.unsubscribe();
                $nuked.unsubscribe();
            });
    }
}

export class SampleGame extends Game<ISampleState, Player> {
    constructor() {
        super({ turn: 0, playedMonsters: [], player: new Player("Fatih") });
    }
}
