import { Action } from "./Action";
import { BehaviorSubject, ReplaySubject } from "rxjs";

export class Game<T> {
    
        public $state: BehaviorSubject<T>;

        public $beforeAction: ReplaySubject<Action<T>>;
        public $afterAction: ReplaySubject<Action<T>>;

        constructor(initialState: T) {
            this.$state = new BehaviorSubject<T>(initialState);
            this.$beforeAction = new ReplaySubject<Action<T>>();
            this.$afterAction = new ReplaySubject<Action<T>>();
        }

        public end() {
            this.$state.complete();
            this.$beforeAction.complete();
            this.$afterAction.complete();
        }
    
        public execute(action: Action<T>) {
            if(!action.isAllowed(this.$state.getValue())){
                throw new Error("Action is not allowed!");
            }
            this.$beforeAction.next(action);
            this.$state.next(action.transform(this.$state.getValue()));
            this.$afterAction.next(action);
        }
    
}