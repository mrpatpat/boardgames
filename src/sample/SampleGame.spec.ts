import {
    SampleGame,
    NextTurn,
    PlayMonster,
    Monster,
    NukeMonsters
} from "./SampleGame";
import { Player } from "../core/Player";
import { delay, merge, concat } from "rxjs/operators";
import { Observable } from "rxjs";

describe("SampleGame", () => {
    it("should ...", async done => {
        // init stuff
        const g = new SampleGame();
        const m1 = new Monster(g);
        const m2 = new Monster(g);
        const $all = g.$state.pipe(concat(g.$beforeAction, g.$afterAction));

        // subscribe to events
        g.$state.subscribe(s => console.log("state", s));
        g.$beforeAction.subscribe(a => console.log("beforeAction", a));
        g.$afterAction.subscribe(a => console.log("afterAction", a));
        $all.subscribe(
            () => {},
            () => {},
            () => {
                console.log("done");
                done();
            }
        );

        // execute stuff in game
        const { player } = g.getState();
        g.execute(new NextTurn(player));
        g.execute(new NextTurn(player));
        g.execute(new PlayMonster(player, m1));
        g.execute(new NextTurn(player));
        g.execute(new PlayMonster(player, m2));
        g.execute(new NextTurn(player));
        g.execute(new NukeMonsters(player));
        g.execute(new NextTurn(player));
        g.execute(new NextTurn(player));
        g.end();
    });
});
