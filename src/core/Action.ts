export abstract class Action<T> {
    abstract isAllowed(state: T): boolean;
    abstract transform(state: T): T;
}
