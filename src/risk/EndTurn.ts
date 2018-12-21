import { IRiskState, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import { isCurrentPlayersAction } from "./Util";

export class EndTurn extends Action<IRiskState> {

    isAllowed(state: IRiskState): boolean {
        return isCurrentPlayersAction(this, state);
    }    
    
    transform(state: IRiskState): IRiskState {
        console.log(`${this.origin.name} ends the turn prematurely`);
        return {...state, phase: RiskPhase.DEPLOY_PHASE, turn: state.turn + 1, currentPlayerIndex: (state.turn + 1) % state.players.length};
    }

}