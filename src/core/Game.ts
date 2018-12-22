import { Action } from "./Action";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Player } from "./Player";

export class Game<T, P extends Player> {
    public $state: BehaviorSubject<T>;

    public $beforeAction: ReplaySubject<Action<T, P>>;
    public $afterAction: ReplaySubject<Action<T, P>>;

    constructor(initialState: T) {
        this.$state = new BehaviorSubject<T>(initialState);
        this.$beforeAction = new ReplaySubject<Action<T, P>>();
        this.$afterAction = new ReplaySubject<Action<T, P>>();
    }

    public end() {
        this.$state.complete();
        this.$beforeAction.complete();
        this.$afterAction.complete();
    }

    public execute(action: Action<T, P>) {
        if (!action.isAllowed(this.$state.getValue())) {
            throw new Error("Action is not allowed!");
        }
        this.$beforeAction.next(action);
        this.$state.next(action.transform(this.$state.getValue()));
        this.$afterAction.next(action);
    }
}
