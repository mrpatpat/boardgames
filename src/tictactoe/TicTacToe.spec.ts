import { TicTacToe } from "./TicTacToe";
import { concat } from "rxjs/operators";
import { EventLogger } from "../core/util/EventLogger";

describe("ticTacToe", () => {
    it("play", async done => {
        // init stuff
        const g = new TicTacToe();
        const l = new EventLogger();
        l.connect(g.$getEventStream());

        // subscribe to events
        g.$winner.subscribe(p => {
            expect(p.name).toBe("x");
            l.disconnect();
            done();
        });

        // execute stuff in game
        g.markAsCurrentPlayer(0);
        g.markAsCurrentPlayer(8);
        g.markAsCurrentPlayer(1);
        g.markAsCurrentPlayer(7);
        g.markAsCurrentPlayer(2);
    });
});
