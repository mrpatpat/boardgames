import { IRiskState } from "./Risk";
import { RiskPlayer } from "./RiskPlayer";
import { Action } from "../core/Action";

export function getCurrentPlayer(state: IRiskState): RiskPlayer {
    return state.players[state.currentPlayerIndex];
}

export function isCurrentPlayersAction(
    action: Action<IRiskState, RiskPlayer>,
    state: IRiskState
): boolean {
    return getCurrentPlayer(state) === action.origin;
}

export function isNotOccupied(state: IRiskState, countryId: number): boolean {
    const country = state.countries.find(c => c.id === countryId);
    return country ? country.occupist === null : false;
}

export function isOccupiedByActionPlayer(
    action: Action<IRiskState, RiskPlayer>,
    state: IRiskState,
    countryId: number
): boolean {
    const country = state.countries.find(c => c.id === countryId);
    return country ? country.occupist === action.origin : false;
}

export function traversable(
    state: IRiskState,
    originId: number,
    targetId: number
): boolean {
    const origin = state.countries.find(c => c.id === originId);
    return origin ? origin.neighbours.indexOf(targetId) !== -1 : false;
}
