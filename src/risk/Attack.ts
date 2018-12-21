import { IRiskState, ICountry, Risk, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import { isCurrentPlayersAction, isNotOccupied, isOccupiedByActionPlayer, traversable } from "./Util";
import { RiskPlayer } from "./RiskPlayer";

export class Attack extends Action<IRiskState> {

    constructor(origin: RiskPlayer, private originCountryId: number, private targetCountryId: number) {
        super(origin);
    }

    isAllowed(state: IRiskState): boolean {
        return isCurrentPlayersAction(this, state) 
            && isOccupiedByActionPlayer(this, state, this.originCountryId) 
            && !isOccupiedByActionPlayer(this, state, this.targetCountryId)
            && traversable(state, this.originCountryId, this.targetCountryId)
            && state.phase === RiskPhase.ATTACK_PHASE 
            && (this.origin as RiskPlayer).selectedStarterCountry;
    }    
    
    transform(state: IRiskState): IRiskState {
        const origin = state.countries.find(c=>c.id === this.originCountryId);
        const target = state.countries.find(c=>c.id === this.targetCountryId);

        if(origin && target) {
            console.log(`${this.origin.name} attacks ${target.soldiers} in ${target.name} with ${origin.soldiers} from ${origin.name}`);

            if(origin.soldiers === target.soldiers) {
                origin.soldiers = 1;
                target.soldiers = 1;
                console.log(`Tie! both armies at 1`);
            } else if (origin.soldiers > target.soldiers) {
                const old = origin.soldiers + 0;
                origin.soldiers = 1;
                target.soldiers = old - 1;
                target.occupist = this.origin as RiskPlayer; //TODO make player generic in action
                console.log(`${this.origin.name} occupied ${target.name} with ${target.soldiers} in ${target.name} and ${origin.soldiers} in ${origin.name}`);
            } else if (origin.soldiers < target.soldiers) {
                origin.soldiers = 1;
                console.log(`${this.origin.name} lost all but 1 soldier in ${origin.name}`);
            }
        }
        return {...state, phase: RiskPhase.ATTACK_PHASE };
    }

}