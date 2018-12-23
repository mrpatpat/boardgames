import { Game } from "../../core/Game";
import { SolitaireState, buildInitialState } from "./SolitaireState";

export class Solitaire extends Game<SolitaireState> {

    constructor() {
        super(buildInitialState());
    }

}