import { Game } from "../../core/Game";
import { SolitaireState, initialState } from "./SolitaireState";

export class Solitaire extends Game<SolitaireState> {

    constructor() {
        super(initialState);
    }

}