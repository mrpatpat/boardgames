import { Game } from "../core/Game";
import { Observable } from "rxjs";
import { RiskPlayer } from "./RiskPlayer";
import { filter } from "rxjs/operators";

export enum RiskPhase {
    DEPLOY_PHASE,
    ATTACK_PHASE,
    MOVE_PHASE
}

export interface ICountry {
    id: number;
    name: string;
    neighbours: number[];
    occupist: RiskPlayer | null;
    soldiers: number;
}

export interface IRiskState {
    turn: number;
    players: RiskPlayer[];
    countries: ICountry[];
    currentPlayerIndex: number;
    phase: RiskPhase;
}

export class Risk extends Game<IRiskState, RiskPlayer> {
    constructor(players: RiskPlayer[], countries: ICountry[]) {
        super({
            turn: 0,
            players: players,
            currentPlayerIndex: 0,
            countries: countries,
            phase: RiskPhase.DEPLOY_PHASE
        });
    }
}
