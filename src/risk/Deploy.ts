import { IRiskState, ICountry, Risk, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import { isCurrentPlayersAction, isNotOccupied, isOccupiedByActionPlayer } from "./Util";
import { RiskPlayer } from "./RiskPlayer";

export class Deploy extends Action<IRiskState> {

    constructor(origin: RiskPlayer, private countryId: number) {
        super(origin);
    }

    isAllowed(state: IRiskState): boolean {
        return isCurrentPlayersAction(this, state) 
            && isOccupiedByActionPlayer(this, state, this.countryId) 
            && state.phase === RiskPhase.DEPLOY_PHASE 
            && (this.origin as RiskPlayer).selectedStarterCountry;
    }    
    
    transform(state: IRiskState): IRiskState {
        const country = state.countries.find(c=>c.id === this.countryId);
        const amount = state.countries.filter(c=>c.occupist === this.origin).length;

        if(country) {
            country.soldiers += amount;
            console.log(`${this.origin.name} deploys ${amount} soldiers to ${country.name}`);
        }
        return {...state, phase: RiskPhase.ATTACK_PHASE };
    }

}