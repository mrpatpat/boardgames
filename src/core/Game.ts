import { Action } from "./Action";
import { BehaviorSubject, ReplaySubject, Observable } from "rxjs";
import { Player } from "./Player";
import { GameState } from "./GameState";
import { BaseEvent } from "./events/BaseEvent";
import { GameStateChangedEvent } from "./events/GameStateChangedEvent";
import { BeforeActionExecutedEvent } from "./events/BeforeActionExecutedEvent";
import { AfterActionExecutedEvent } from "./events/AfterActionExecutedEvent";
import { filter, map } from "rxjs/operators";

export class Game<T extends GameState, P extends Player> {
    private lastGameState: T;

    private $events: BehaviorSubject<BaseEvent>;

    public $state: Observable<T>;
    public $beforeAction: Observable<Action<T, P>>;
    public $afterAction: Observable<Action<T, P>>;

    constructor(initialState: T) {
        this.lastGameState = initialState;

        this.$events = new BehaviorSubject<BaseEvent>(
            new GameStateChangedEvent(initialState)
        );

        this.$state = this.$events.pipe(
            filter(e => e instanceof GameStateChangedEvent),
            map(e => (e as GameStateChangedEvent<T>).getState())
        );

        this.$beforeAction = this.$events.pipe(
            filter(e => e instanceof BeforeActionExecutedEvent),
            map(e => (e as BeforeActionExecutedEvent<T, P>).getAction())
        );

        this.$afterAction = this.$events.pipe(
            filter(e => e instanceof AfterActionExecutedEvent),
            map(e => (e as AfterActionExecutedEvent<T, P>).getAction())
        );
        
    }

    private nextState(state: T) {
        this.lastGameState = state;
        this.$events.next(new GameStateChangedEvent(state));
    }

    public getState(): T {
        return this.lastGameState;
    }

    public end() {
        this.$events.complete();
    }

    public execute(action: Action<T, P>) {
        if (!action.isAllowed(this.getState())) {
            throw new Error("Action is not allowed!");
        }
        this.$events.next(new BeforeActionExecutedEvent(action));
        this.nextState(action.transform(this.getState()));
        this.$events.next(new AfterActionExecutedEvent(action));
    }
}
