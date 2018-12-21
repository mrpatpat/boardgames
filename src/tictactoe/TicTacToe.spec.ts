import { TicTacToe } from "./TicTacToe";
import { concat } from "rxjs/operators";

describe("ticTacToe", ()=>{

    it("play", async (done)=>{

        // init stuff
        const g = new TicTacToe();

        // subscribe to events
        g.$winner.subscribe((p)=>{
            expect(p.name).toBe("x");
            done();
        });

        // execute stuff in game
        g.markAsCurrentPlayer(0);
        g.markAsCurrentPlayer(8);
        g.markAsCurrentPlayer(1);
        g.markAsCurrentPlayer(7);
        g.markAsCurrentPlayer(2);

    });

})