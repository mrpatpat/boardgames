import { IRiskState, ICountry, Risk, RiskPhase } from "./Risk";
import { Action } from "../core/Action";
import { isCurrentPlayersAction, isNotOccupied } from "./Util";
import { RiskPlayer } from "./RiskPlayer";

export class SelectStarterCountry extends Action<IRiskState, RiskPlayer> {
    constructor(origin: RiskPlayer, private countryId: number) {
        super(origin);
    }

    isAllowed(state: IRiskState): boolean {
        return (
            isCurrentPlayersAction(this, state) &&
            isNotOccupied(state, this.countryId) &&
            state.phase === RiskPhase.DEPLOY_PHASE &&
            !this.origin.selectedStarterCountry
        );
    }

    transform(state: IRiskState): IRiskState {
        const country = state.countries.find(c => c.id === this.countryId);
        if (country) {
            const p = this.origin;
            p.selectedStarterCountry = true;
            country.occupist = p;
            country.soldiers = 5;
            console.log(
                `${this.origin.name} selected ${
                    country.name
                } as starting point with ${country.soldiers} soldiers`
            );
        }
        return {
            ...state,
            turn: state.turn + 1,
            currentPlayerIndex: (state.turn + 1) % state.players.length
        };
    }
}
