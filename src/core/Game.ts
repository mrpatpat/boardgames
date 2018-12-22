import { Action } from "./Action";
import { BehaviorSubject, Observable } from "rxjs";
import { GameState } from "./GameState";
import { BaseEvent } from "./events/BaseEvent";
import { GameStateChangedEvent } from "./events/GameStateChangedEvent";
import { BeforeActionExecutedEvent } from "./events/BeforeActionExecutedEvent";
import { AfterActionExecutedEvent } from "./events/AfterActionExecutedEvent";
import { filter, map } from "rxjs/operators";
import { BaseErrorEvent } from "./events/BaseErrorEvent";
import { ActionNotAllowedEvent } from "./events/ActionNotAllowedEvent";

export class Game<T extends GameState> {
    private lastGameState: T;

    private $events: BehaviorSubject<BaseEvent>;

    public $state: Observable<T>;
    public $beforeAction: Observable<Action<T>>;
    public $afterAction: Observable<Action<T>>;

    public $errors: Observable<BaseErrorEvent>;

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
            map(e => (e as BeforeActionExecutedEvent<T>).getAction())
        );

        this.$afterAction = this.$events.pipe(
            filter(e => e instanceof AfterActionExecutedEvent),
            map(e => (e as AfterActionExecutedEvent<T>).getAction())
        );

        this.$errors = this.$events.pipe(
            filter(e => e instanceof BaseErrorEvent),
            map(e => e as BaseErrorEvent)
        );
    }

    public $getEventStream(): Observable<BaseEvent> {
        return this.$events;
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

    public execute(action: Action<T>) {
        if (!action.isAllowed(this.getState())) {
            this.$events.next(
                new ActionNotAllowedEvent(
                    action,
                    "This action is not allowed in this state"
                )
            );
        } else {
            this.$events.next(new BeforeActionExecutedEvent(action));
            this.nextState(action.transform(this.getState()));
            this.$events.next(new AfterActionExecutedEvent(action));
        }
    }
}
