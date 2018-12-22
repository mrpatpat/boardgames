import { IRiskState, ICountry, Risk, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import {
    isCurrentPlayersAction,
    isNotOccupied,
    isOccupiedByActionPlayer,
    traversable
} from "./Util";
import { RiskPlayer } from "./RiskPlayer";

export class EndAttack extends Action<IRiskState, RiskPlayer> {
    isAllowed(state: IRiskState): boolean {
        return (
            isCurrentPlayersAction(this, state) &&
            state.phase === RiskPhase.ATTACK_PHASE &&
            this.origin.selectedStarterCountry
        );
    }

    transform(state: IRiskState): IRiskState {
        console.log(`${this.origin.name} ends the attack phase`);
        return { ...state, phase: RiskPhase.MOVE_PHASE };
    }
}
