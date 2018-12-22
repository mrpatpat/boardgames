import { IRiskState, ICountry, Risk, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import {
    isCurrentPlayersAction,
    isNotOccupied,
    isOccupiedByActionPlayer,
    traversable
} from "./Util";
import { RiskPlayer } from "./RiskPlayer";

export class Move extends Action<IRiskState, RiskPlayer> {
    constructor(
        origin: RiskPlayer,
        private originCountryId: number,
        private targetCountryId: number
    ) {
        super(origin);
    }

    isAllowed(state: IRiskState): boolean {
        return (
            isCurrentPlayersAction(this, state) &&
            isOccupiedByActionPlayer(this, state, this.originCountryId) &&
            isOccupiedByActionPlayer(this, state, this.targetCountryId) &&
            traversable(state, this.originCountryId, this.targetCountryId) &&
            state.phase === RiskPhase.MOVE_PHASE &&
            this.origin.selectedStarterCountry
        );
    }

    transform(state: IRiskState): IRiskState {
        const origin = state.countries.find(c => c.id === this.originCountryId);
        const target = state.countries.find(c => c.id === this.targetCountryId);

        if (origin && target) {
            const moving = origin.soldiers - 1;
            origin.soldiers = 1;
            target.soldiers += moving;
            console.log(
                `${this.origin.name} moved ${moving} soldiers from ${
                    origin.name
                } to ${target.name}`
            );
        }
        return {
            ...state,
            phase: RiskPhase.DEPLOY_PHASE,
            turn: state.turn + 1,
            currentPlayerIndex: (state.turn + 1) % state.players.length
        };
    }
}
